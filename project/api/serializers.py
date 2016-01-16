# -*- coding: utf-8 -*-

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Employee,
    Subdivision,
    Project,
    Task,
    Comment,
    TaskPicture,
    CommentPicture
  )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('is_staff','is_superuser','is_active','groups','user_permissions')
        extra_kwargs = {'password': {'write_only': True}}

class EmployeeSerializer(serializers.ModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='employee-detail')
    user = UserSerializer()
    subdivision = serializers.SlugRelatedField(
        read_only=True,
        slug_field='title'
    )
    class Meta:
        model = Employee

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User(**user_data)
        user.set_password(user_data['password'])
        user.save()
        employee = Employee.objects.create(user=user, **validated_data)
        return employee

class SubdivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subdivision

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project

class TaskParentSerializer(serializers.ModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='task-detail')
    class Meta:
        model = Task
        fields =( 'title', 'link',)

class TaskSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    base_task = TaskParentSerializer(read_only=True)

    class Meta:
        model = Task

class CommentSerializer(serializers.ModelSerializer):
    owner = EmployeeSerializer(read_only=True)
    class Meta:
        model = Comment

class TaskPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskPicture

class CommentPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentPicture
# -*- coding: utf-8 -*-

from rest_framework import serializers
from rest_framework import exceptions
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

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        for key in user_data:
            instance[key] = user_data.get(key, instance[key])

        for key in validated_data:
            instance[key] = validated_data.get(key, instance[key])
        instance.save()
        return instance

class SubdivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subdivision

class ProjectSerializer(serializers.ModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='project-detail')
    class Meta:
        model = Project

class TaskParentSerializer(serializers.ModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='task-detail')
    class Meta:
        model = Task
        fields =( 'id','title', 'link',)

class EmployeeChildField(serializers.RelatedField):
    def to_representation(self, value):
        return value.username

class TaskSerializer(serializers.ModelSerializer):
    owner =  serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    base_task = TaskParentSerializer(read_only=True)
    project_name = serializers.CharField(
       source='project', read_only=True, required=False
    )
    owner_name = EmployeeChildField(
       source='owner', read_only=True,required=False
    )
    responsible_name = EmployeeChildField(
       source='responsible', read_only=True,required=False
    )

    class Meta:
        model = Task
        fields = (
            'id',
            'url',
            'base_task',
            'title',
            'text',
            'created_date',
            'priority',
            'status',
            'project',
            'owner',
            'responsible',
            'project_name',
            'owner_name',
            'responsible_name',
        )


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
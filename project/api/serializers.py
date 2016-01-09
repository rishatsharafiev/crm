# -*- coding: utf-8 -*-

from rest_framework import serializers
from .models import (
    Employee,
    Subdivision,
    Project,
    Task,
    Comment,
    TaskPicture,
    CommentPicture
  )

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        exclude = ('password','is_staff','is_superuser','is_active','groups','user_permissions')

class SubdivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subdivision

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment

class TaskPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskPicture

class CommentPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentPicture
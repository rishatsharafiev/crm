# -*- coding: utf-8 -*-

from rest_framework import serializers
from rest_framework import exceptions
from rest_framework.validators import ValidationError, UniqueValidator
from django.contrib.auth.models import User
from .models import (
    Employee,
    Subdivision,
    Project,
    Task,
    Comment,
    # TaskPicture,
    # CommentPicture
  )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('is_staff','is_superuser','is_active','groups','user_permissions')
        extra_kwargs = {
            'password': {
                'required': False,
                'write_only': True
            },
            'username': {
                'validators': []
            }
        }

    def restore_object(self, attrs, instance=None):
        user = super(UserSerializer, self).restore_object(attrs, instance)
        user.set_password(attrs['password'])
        return user

class EmployeeChildField(serializers.RelatedField):
    def to_representation(self, value):
        return value.title

class EmployeeSerializer(serializers.ModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='employee-detail')
    user = UserSerializer()

    subdivision_name = EmployeeChildField(
        source='subdivision', read_only=True, required=False
    )

    put_method_allowed = serializers.SerializerMethodField()
    delete_method_allowed = serializers.SerializerMethodField()

    def get_put_method_allowed(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        owner = authenticated and (obj.user == user)
        return  staff or owner

    def get_delete_method_allowed(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        return  staff

    class Meta:
        model = Employee
        fields = (
            "id",
            'user',
            'link',
            'subdivision',
            'subdivision_name',
            'put_method_allowed',
            'delete_method_allowed'
        )
        related_obj_name = 'user'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        user.set_password( user_data.get('password') )
        user.save()
        employee = Employee.objects.create(user=user, **validated_data)
        return employee

    def update(self, instance, validated_data):
        related_obj_name = self.Meta.related_obj_name
        data = validated_data.pop(related_obj_name)
        related_instance = getattr(instance, related_obj_name)

        for attr_name, value in data.items():
            if attr_name == 'password':
                related_instance.set_password(value)
            else:
                setattr(related_instance, attr_name, value)
        related_instance.save()
        return super(EmployeeSerializer,self).update(instance, validated_data)


class SubdivisionChildField(serializers.RelatedField):
    def to_representation(self, value):
        return value.username

class SubdivisionSerializer(serializers.ModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='subdivision-detail')
    manager_name = SubdivisionChildField(
       source='manager', read_only=True, required=False
    )

    put_method_allowed = serializers.SerializerMethodField()
    delete_method_allowed = serializers.SerializerMethodField()

    def get_put_method_allowed(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        owner = authenticated and (obj.manager == user)
        return  staff or owner

    def get_delete_method_allowed(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        return  staff

    class Meta:
        model = Subdivision
        fields = (
            'id',
            'link',
            'title',
            'description',
            'manager',
            'manager_name',
            'put_method_allowed',
            'delete_method_allowed'
        )



class ProjectChildField(serializers.RelatedField):
    def to_representation(self, value):
        return value.username

class ProjectSerializer(serializers.ModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='project-detail')
    owner =  serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    owner_name = ProjectChildField(
       source='owner', read_only=True, required=False
    )

    task_count = serializers.SerializerMethodField()

    def get_task_count(self, obj):
        return obj.task_set.count()

    put_method_allowed = serializers.SerializerMethodField()
    delete_method_allowed = serializers.SerializerMethodField()

    def get_put_method_allowed(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        owner = authenticated and (obj.owner == user)
        return  staff or owner

    def get_delete_method_allowed(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        owner = authenticated and (obj.owner == user)
        return  staff or owner

    class Meta:
        model = Project
        fields = (
            'id',
            'link',
            'title',
            'description',
            'created_date',
            'owner',
            'owner_name',
            'task_count',
            'put_method_allowed',
            'delete_method_allowed'
        )

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
    base_task =  serializers.PrimaryKeyRelatedField(queryset=Task.objects.all(), required=False, allow_null=True)

    project_name = serializers.CharField(
       source='project', read_only=True, required=False
    )
    owner_name = EmployeeChildField(
       source='owner', read_only=True,required=False
    )
    responsible_name = EmployeeChildField(
       source='responsible', read_only=True,required=False
    )

    base_task_name = serializers.CharField(
       source='base_task', read_only=True, required=False
    )

    status_type = serializers.SerializerMethodField()
    put_method_allowed = serializers.SerializerMethodField()
    delete_method_allowed = serializers.SerializerMethodField()

    def get_put_method_allowed(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        owner = authenticated and (obj.owner == user)
        responsible = authenticated and (obj.responsible == user)
        return  staff or owner or responsible

    def get_delete_method_allowed(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        owner = authenticated and (obj.owner == user)
        return  staff or owner

    def get_status_type(self, obj):
        user = self.context['request'].user
        authenticated = user.is_authenticated()
        staff = authenticated and user.is_staff
        owner = authenticated and (obj.owner == user)

        return staff or owner

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
            'base_task_name',
            'put_method_allowed',
            'delete_method_allowed',
            'status_type'
        )



class CommentSerializer(serializers.ModelSerializer):
    employee =  serializers.PrimaryKeyRelatedField(read_only=True, required=False)
    employee_name = serializers.CharField(
       source='employee', read_only=True, required=False
    )
    class Meta:
        model = Comment

# class TaskPictureSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TaskPicture

# class CommentPictureSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CommentPicture
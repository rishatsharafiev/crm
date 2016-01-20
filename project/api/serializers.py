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
    # id = serializers.IntegerField()
    # username = serializers.CharField()
    # password = serializers.CharField()
    # last_login = serializers.DateTimeField(required=False)
    # first_name = serializers.CharField(required=False)
    # last_name = serializers.CharField(required=False)
    # email = serializers.EmailField(required=False)
    # date_joined = serializers.DateTimeField(required=False)

    class Meta:
        model = User
        exclude = ('is_staff','is_superuser','is_active','groups','user_permissions')
        extra_kwargs = {
            'password': {
                'write_only': True,
                # 'validators': [],
                # 'required':False
            },
            # 'username': {
            #     'validators': [],
            #     'required':False
            # },
            # 'id': {'read_only': False, 'required': False}
        }

    # def to_internal_value(self, data):
    #     if 'id' in data and 'id' in self.fields:
    #         try:
    #             obj_id = self.fields['id'].to_internal_value(data['id'])
    #         except ValidationError as exc:
    #             raise ValidationError({'id': exc.detail})
    #         for field in self.fields.values():
    #             for validator in field.validators:
    #                 if type(validator) == UniqueValidator:
    #                     # Exclude id from queryset for checking uniqueness
    #                     validator.queryset = validator.queryset.exclude(id=obj_id)
    #     return super(WritableNestedModelSerializer, self).to_internal_value(data)

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
            'id',
            'link',
            'user',
            'subdivision',
            'subdivision_name',
            'put_method_allowed',
            'delete_method_allowed'
        )

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        user.set_password( user_data.get('password') )
        employee = Employee.objects.create(user=user, **validated_data)
        return employee

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user

        for key in validated_data:
            instance[key] = validated_data.get(key, instance[key])

        for key in user:
            if key == 'password':
                user.set_password( user_data.get('password') )
            else:
                user[key] = user_data.get(
                    key,
                    user[key]
                )

        user.save()
        instance.user = user
        instance.save()
        return instance


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
            'delete_method_allowed'
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
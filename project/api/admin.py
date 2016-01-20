# -*- coding: utf-8 -*-

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
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

class EmployeeInline(admin.StackedInline):
    model = Employee
    can_delete = False
    verbose_name_plural = 'Дополнительные поля'

class UserAdmin(BaseUserAdmin):
    inlines = (EmployeeInline, )

class SubdivisionAdmin(admin.ModelAdmin):
    pass

class ProjectAdmin(admin.ModelAdmin):
    search_fields = ('title',)
    list_filter = ('created_date',)
    date_hierarchy = 'created_date'
    readonly_fields = ('created_date',)

class TaskAdmin(admin.ModelAdmin):
    search_fields = ('title', 'text')
    list_filter = ('created_date',)
    date_hierarchy = 'created_date'
    readonly_fields = ('created_date',)

class CommentAdmin(admin.ModelAdmin):
    list_filter = ('created_date',)
    date_hierarchy = 'created_date'
    readonly_fields = ('created_date',)

# class TaskPictureAdmin(admin.ModelAdmin):
#     pass

# class CommentPictureAdmin(admin.ModelAdmin):
#     pass


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Subdivision, SubdivisionAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Comment, CommentAdmin)
# admin.site.register(TaskPicture, TaskPictureAdmin)
# admin.site.register(CommentPicture, CommentPictureAdmin)
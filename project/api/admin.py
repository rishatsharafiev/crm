# -*- coding: utf-8 -*-

from django.contrib import admin

from .models import (
    Employee,
    Subdivision,
    Project,
    Task,
    Comment,
    TaskPicture,
    CommentPicture
  )

class EmployeeAdmin(admin.ModelAdmin):
    fields = (
        'username',
        'avatar',
        'subdivision',
        'first_name',
        'last_name',
        'email',
        'is_active',
        'is_staff',
        'is_superuser',
        'last_login',
        'date_joined'
    )

    readonly_fields = ('username',)

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

class TaskPictureAdmin(admin.ModelAdmin):
    pass

class CommentPictureAdmin(admin.ModelAdmin):
    pass


admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Subdivision, SubdivisionAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(TaskPicture, TaskPictureAdmin)
admin.site.register(CommentPicture, CommentPictureAdmin)
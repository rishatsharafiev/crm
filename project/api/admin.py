# -*- coding: utf-8 -*-

from django.contrib import admin

from .models import (
    Employee,
    Project,
    Task,
    Comment,
    TaskPicture,
    CommentPicture
  )

class EmployeeAdmin(admin.ModelAdmin):
    pass

class ProjectAdmin(admin.ModelAdmin):
    search_fields = ('title',)

class TaskAdmin(admin.ModelAdmin):
    search_fields = ('title', 'text')
    list_filter = ('created_date',)
    date_hierarchy = 'created_date'

class CommentAdmin(admin.ModelAdmin):
    list_filter = ('created_date',)
    date_hierarchy = 'created_date'

class TaskPictureAdmin(admin.ModelAdmin):
    pass

class CommentPictureAdmin(admin.ModelAdmin):
    pass


admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(TaskPicture, TaskPictureAdmin)
admin.site.register(CommentPicture, CommentPictureAdmin)
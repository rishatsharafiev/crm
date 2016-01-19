# -*- coding: utf-8 -*-

from django.db.models import Q, F
from rest_framework.response import Response
from rest_framework.decorators import list_route
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import filters
from .models import (
    Employee,
    Subdivision,
    Project,
    Task,
    Comment,
    TaskPicture,
    CommentPicture
  )

from .serializers import (
    EmployeeSerializer,
    SubdivisionSerializer,
    ProjectSerializer,
    TaskSerializer,
    CommentSerializer,
    TaskPictureSerializer,
    CommentPictureSerializer
  )
from .permissions import TaskPermission

class EmployeeViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class SubdivisionViewSet(viewsets.ModelViewSet):
    queryset = Subdivision.objects.all()
    serializer_class = SubdivisionSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = (TaskPermission,)
    filter_backends = (filters.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter,)
    filter_fields = ('project', )
    search_fields = ('title',)
    ordering_fields = ('created_date',)
    ordering = ('-created_date',)

    def get_queryset(self):
        task = Task.objects.filter( Q(owner=self.request.user) | Q(responsible=self.request.user) )

        ids = []

        for i in task:
            ids.append(i.id)

        def walk(task):
            if task.base_task:
                ids.append(task.base_task.id)
                walk(task.base_task)

        for i in task:
            walk(i)

        task = Task.objects.filter(id__in=ids)
        return task

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)



class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class TaskPictureViewSet(viewsets.ModelViewSet):
    queryset = TaskPicture.objects.all()
    serializer_class = TaskPictureSerializer

class CommentPictureViewSet(viewsets.ModelViewSet):
    queryset = CommentPicture.objects.all()
    serializer_class = CommentPictureSerializer


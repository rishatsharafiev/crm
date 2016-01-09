# -*- coding: utf-8 -*-

from rest_framework import viewsets
from rest_framework import permissions
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
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class TaskPictureViewSet(viewsets.ModelViewSet):
    queryset = TaskPicture.objects.all()
    serializer_class = TaskPictureSerializer

class CommentPictureViewSet(viewsets.ModelViewSet):
    queryset = CommentPicture.objects.all()
    serializer_class = CommentPictureSerializer
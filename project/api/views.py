# -*- coding: utf-8 -*-

from django.db.models import Q
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
        return Task.objects.filter( Q(owner=self.request.user) | Q(responsible=self.request.user) )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)

    @list_route(methods=['get'])
    def tasks_permission(self, request):
        queryset = self.get_queryset.filter(Q(owner=request.user) | Q(responsible=request.user))
        print 'Hello'
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)




class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class TaskPictureViewSet(viewsets.ModelViewSet):
    queryset = TaskPicture.objects.all()
    serializer_class = TaskPictureSerializer

class CommentPictureViewSet(viewsets.ModelViewSet):
    queryset = CommentPicture.objects.all()
    serializer_class = CommentPictureSerializer


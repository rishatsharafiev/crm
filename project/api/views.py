# -*- coding: utf-8 -*-

from django.db.models import Q, F
from rest_framework.response import Response
from rest_framework.decorators import list_route, detail_route
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import filters
from .models import (
    Employee,
    Subdivision,
    Project,
    Task,
    Comment,
    # TaskPicture,
    # CommentPicture
  )

from .serializers import (
    EmployeeSerializer,
    SubdivisionSerializer,
    ProjectSerializer,
    TaskSerializer,
    CommentSerializer,
    # TaskPictureSerializer,
    # CommentPictureSerializer
  )

from .permissions import (
    TaskPermission,
    ProjectPermission,
    EmployeePermission,
    SubdivisionPermission
  )
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    permission_classes = (EmployeePermission,)
    serializer_class = EmployeeSerializer

    # def get_serializer_class(self, instance=None, data=None, many=False, partial=False):
    #     if self.action == 'create':
    #         return EmployeePostSerializer
    #     else:
    #         return EmployeeAllSerializer

    # def update(self, request, *args, **kwargs):
    #     user_profile = self.get_object()
    #     serializer = self.get_serializer(user_profile, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #     return Response(serializer.data)



class SubdivisionViewSet(viewsets.ModelViewSet):
    queryset = Subdivision.objects.all()
    permission_classes = (SubdivisionPermission,)
    serializer_class = SubdivisionSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = (ProjectPermission,)
    serializer_class = ProjectSerializer
    filter_backends = (filters.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter,)
    filter_fields = ('owner', )
    search_fields = ('title',)
    ordering_fields = ('created_date',)
    ordering = ('-created_date',)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


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

        for i in task:
            if i.base_task:
                ids.append(i.base_task.id)

        task = Task.objects.filter(id__in=ids)

        return task

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @detail_route(methods=['GET'])
    def schema(self, request, pk=None):
        meta = self.metadata_class()
        data = meta.determine_metadata(request, self)
        return Response(data)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('task', )

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

# class TaskPictureViewSet(viewsets.ModelViewSet):
#     queryset = TaskPicture.objects.all()
#     serializer_class = TaskPictureSerializer

# class CommentPictureViewSet(viewsets.ModelViewSet):
#     queryset = CommentPicture.objects.all()
#     serializer_class = CommentPictureSerializer


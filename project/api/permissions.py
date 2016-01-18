from rest_framework import permissions
from .models import Task

class TaskPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        authenticated = request.user.is_authenticated()
        if view.action == 'list':
            return authenticated
        elif view.action == 'create':
            return authenticated
        elif view.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return authenticated
        else:
            return False

    def has_object_permission(self, request, view, obj):
        authenticated = request.user.is_authenticated()
        staff = authenticated and request.user.is_staff
        owner = authenticated and (obj.owner == request.user)
        responsible = authenticated and (obj.responsible == request.user)

        if view.action == 'retrieve':
            return owner or responsible or staff
        elif view.action in ['update', 'partial_update']:
            return owner or responsible or staff
        elif view.action == 'destroy':
            return owner or staff
        else:
            return False
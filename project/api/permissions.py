from rest_framework import permissions

class TaskPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action == 'list':
            return request.user.is_authenticated()
        elif view.action == 'create':
            return True
        elif view.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        if view.action == 'retrieve':
            return True
        elif view.action in ['update', 'partial_update']:
            return request.user.is_authenticated() and (obj.owner.id == request.user.id)
        elif view.action == 'destroy':
            return request.user.is_authenticated() and (obj.owner.id == request.user.id)
        else:
            return False
# -*- coding: utf-8 -*-

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter(trailing_slash=False)
router.register(r'employee', views.EmployeeViewSet)
router.register(r'subdivision', views.SubdivisionViewSet)
router.register(r'project', views.ProjectViewSet)
router.register(r'task', views.TaskViewSet, base_name='task')
router.register(r'comment', views.CommentViewSet)
router.register(r'task_picture', views.TaskPictureViewSet)
router.register(r'comment_picture', views.CommentPictureViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += [
    url(r'^login$', 'rest_framework_jwt.views.obtain_jwt_token', name="api-login"),
    url(r'^api-token-verify$', 'rest_framework_jwt.views.verify_jwt_token'),
    url(r'^api-token-refresh$', 'rest_framework_jwt.views.refresh_jwt_token'),
]






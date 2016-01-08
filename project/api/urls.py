# -*- coding: utf-8 -*-

from django.conf.urls import url

urlpatterns = [
    url(r'^login/$', 'rest_framework_jwt.views.obtain_jwt_token', name="api-login")
]
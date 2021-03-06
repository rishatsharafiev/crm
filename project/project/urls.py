# -*- coding: utf-8 -*-

"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
  url(r'^admin/', admin.site.urls),
  url(r'^', include('spa.urls') ),
  url(r'^api/', include('api.urls') ),
  url(r'^testapi/', include('testapi.urls') ),
  url(r'^snippets/', include('snippets.urls') ),
  url(r'^jwt_auth/', include('jwt_auth.urls') ),
]

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
  urlpatterns+= static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
  urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

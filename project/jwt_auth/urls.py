# -*- coding: utf-8 -*-

from django.conf.urls import url
from views import RestrictedView

urlpatterns = [
    url(r'^api-token-auth/$', 'rest_framework_jwt.views.obtain_jwt_token', name="token"),
    url(r'^restricted/$', RestrictedView.as_view()),
]


from django.views.generic import TemplateView

urlpatterns += [
    url(r'^$', TemplateView.as_view(template_name="jwt_auth/base.html")),
]

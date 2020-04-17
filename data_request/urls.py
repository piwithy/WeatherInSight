from django.urls import path

from . import views

app_name = 'data_request'
urlpatterns = [
    path('request_viewer', views.request_viewer, name='request_viewer'),
]

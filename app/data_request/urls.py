from django.urls import path

from . import views

app_name = 'data_request'
urlpatterns = [
    path('', views.request_new_data, name='request_data')
]

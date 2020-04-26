from django.urls import path

from . import views

app_name = 'data_view'
urlpatterns = [
    path('index', views.index, name="index"),
    path('data_index', views.data_index, name="data_index"),
    path('list', views.list_view, name='list'),
    path('sol_details', views.details_view, name='sol_details'),
    path('sol_wind_rose', views.wind_rose_view, name='sol_wind_rose'),
    path('request_view', views.request_view, name='request_view'),
]

from django.urls import path

from . import views

app_name = 'data_request'
urlpatterns = [
    path('request_viewer', views.request_viewer, name='request_viewer'),
    path('request_data', views.request_data, name='request_data'),
    path('<int:sol_date>/', views.detail, name='detail'),
    path('', views.index, name='index')
]

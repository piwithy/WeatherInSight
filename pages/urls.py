from django.contrib import admin
from django.urls import path, include

from . import views

app_name = 'pages'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('data_view/', include('data_view.urls')),
    path('data_request/', include('data_request.urls')),

    path('', views.redirector, name='redirector'),

    path('<str:lang>/', views.index, name='index'),
    path('<str:lang>/list', views.list_view, name='sol_list'),
    path('<str:lang>/sol_<str:sol_key>/detail', views.detail_view, name='sol_detail'),
    path('<str:lang>/sol_<str:sol_key>/', views.wind_rose, name='sol_wind_rose'),
    path('<str:lang>/request_viewer', views.request_viewer, name='request_viewer'),

]

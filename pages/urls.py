from django.urls import path
from . import views

app_name = 'pages'
urlpatterns = [
    path('', views.index, name='index'),
    path('list', views.list_view, name='sol_list'),
    path('sol_<int:sol_key>/detail', views.detail_view, name='sol_detail'),
    path('sol_<int:sol_key>/wind_rose', views.wind_rose, name='sol_wind_rose'),
]

from django.urls import path, include
from django.contrib import admin
from . import views

app_name = 'pages'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('data_view/', include('data_view.urls')),

    path('', views.redirector, name='redirector'),
    path('<str:lang>/common/nav_bar', views.nav_bar, name='nav_bar'),
    path('<str:lang>/common/footer', views.footer, name='footer'),

    path('<str:lang>/', views.index, name='index'),
    path('<str:lang>/data_index', views.data_index, name='data_index'),  # Temporary
    path('<str:lang>/list', views.list_view, name='sol_list'),
    path('<str:lang>/sol_<str:sol_key>/detail', views.detail_view, name='sol_detail'),
    path('<str:lang>/sol_<str:sol_key>/', views.wind_rose, name='sol_wind_rose'),
    path('<str:lang>/request_viewer', views.request_viewer, name='request_viewer'),

]

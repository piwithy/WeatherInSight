from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    # path("import", views.import_data, name="import"),
    path("get_sol", views.export_data, name="get_sol")
]
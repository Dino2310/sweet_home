from . import views
from django.urls import path

urlpatterns = [
    path('base/', views.photos, name = 'photos'),
    path('create_albom/', views.create_albom, name = 'create_albom'),
    path('edit_albom/', views.edit_albom, name = 'edit_albom'),
    path('del/', views.object_del, name="odj_del"),
    path('show/<str:id>', views.show, name="show_albom"),
]

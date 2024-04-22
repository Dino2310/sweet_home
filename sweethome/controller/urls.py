from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name = 'index'),
    path('ex/', views.exemple, name = 'exemple'),
]

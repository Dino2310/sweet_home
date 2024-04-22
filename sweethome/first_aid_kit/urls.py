from . import views
from django.urls import path

urlpatterns = [
    path('', views.list_phatm, name = 'lst_pharm'),
]

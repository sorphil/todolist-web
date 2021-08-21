from django.urls import path
from .views import listData

urlpatterns = [
    path('', listData)
]
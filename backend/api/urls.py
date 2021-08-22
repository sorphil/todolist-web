from django.urls import path
from .views import listData, registration_view

urlpatterns = [
    path('', listData),
    path('register', registration_view, name="register")
]
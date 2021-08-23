from django.urls import path
from .views import check_view, listData, logout_view, registration_view, login_view

urlpatterns = [
    path('', listData),
    path('register', registration_view, name="register"),
    path('login', login_view, name = "login" ),
    path('logout', logout_view, name = "logout"),
    path('check', check_view, name = "check")
]
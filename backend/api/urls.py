from django.urls import path
from .views import projectCreate, projectList, check_view, apiOverview, taskCreate, taskDelete, taskDetail, taskList, logout_view, registration_view, login_view, taskUpdate

urlpatterns = [
    path('', apiOverview),
    path('task-list',taskList),
    path('task-create',taskCreate),
    path('task-update/<str:pk>',taskUpdate),
    path('task-detail/<str:pk>',taskDetail),
    path('task-delete/<str:pk>',taskDelete),
    path('project-list',projectList),
    path('project-create',projectCreate),
    # path('task-update/<str:pk>',taskUpdate),
    # path('task-detail/<str:pk>',taskDetail),
    # path('task-delete/<str:pk>',taskDelete),
    path('register', registration_view, name="register"),
    path('login', login_view, name = "login" ),
    path('logout', logout_view, name = "logout"),
    path('check', check_view, name = "check")
]
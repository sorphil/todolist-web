from django.shortcuts import render
from .models import Task, Project
from django.contrib.auth.models import User
# Create your views here.

def listData(request):
    queryset_users = User.objects.all()
    queryset_tasks = Task.objects.all()
    queryset_project = Project.objects.all()
    context = {
        "users": queryset_users,
        "tasks": queryset_tasks,
        "projects": queryset_project
    }
    return render(request, 'api/test.html', context)
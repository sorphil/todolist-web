from django.shortcuts import render
from rest_framework.serializers import Serializer
from .models import Task, Project
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import RegistrationSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
# Create your views here.



class UserWritePermission(BasePermission):
    message = "Editing tasks/projects is restricted to author only"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.author == request.user


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


@api_view(['POST'])
def registration_view(request):
    if request.method == "POST":
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.saveAccount()
            data['response'] = "Successfully registered a new user"
            data['email'] = user.email
            data['username'] = user.username
        else:
            data = serializer.errors
        return Response(data)
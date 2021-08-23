import json
from django.contrib import auth
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.serializers import Serializer
from django.contrib.auth import authenticate, login, logout
from .models import Task, Project
from django.contrib.auth.models import User
from .serializers import LoginSerializer, RegistrationSerializer, LoginSerializer
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
        return JsonResponse(data)

@api_view(['POST'])
def login_view(request):
    if request.method == "POST":
        # serializer = LoginSerializer(data=request.data)
        data = {}
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        username = User.objects.get(email=body['email']).username
        user = authenticate(username = username, password=body['password'])
        if user is not None:
            login(request, user)
            data['response2'] = f"Current user is {request.user}"
            data['response'] = "Logged In"
        else:
            data['response'] = "User doesn't exist / Wrong credentials or password"
            
        return JsonResponse(data)

@api_view(['POST'])
def logout_view(request):
    data = {}
    data['response'] = "Logged Out"
    logout(request)
  
    return JsonResponse(data)


@api_view(['POST'])
def check_view(request):
    data = {}
    data['response'] = f"Current user is {request.user}"
  
    return JsonResponse(data)
import json
from django.contrib import auth
from django.http.response import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.serializers import Serializer
from django.contrib.auth import authenticate, login, logout
from .models import Task, Project
from django.contrib.auth.models import AnonymousUser, User
from .serializers import LoginSerializer, ProjectSerializer, RegistrationSerializer, LoginSerializer, TaskSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
# Create your views here.






class UserWritePermission(BasePermission):
    message = "Editing tasks/projects is restricted to author only"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.author == request.user


@api_view(['GET', 'POST'])
def apiOverview(request):
    api_urls = {
        "Task-List":"/todos/api/v1/task-list",
        "Task-Detail":"/todos/api/v1/task-detail/<str:pk>",
        "Task-Create":"/todos/api/v1/task-create",
        "Task-Update":"/todos/api/v1/task-update/<str:pk>",
        "Task-Delete":"/todos/api/v1/task-delete/<str:pk>",
        "Project-List":"/todos/api/v1/project-list",
        "Project-Detail":"/todos/api/v1/project-detail/<str:pk>",
        "Project-Create":"/todos/api/v1/project-create",
        "Project-Update":"/todos/api/v1/project-update/<str:pk>",
        "Project-Delete":"/todos/api/v1/project-delete/<str:pk>",
        "Register": "/todos/api/v1/register",
        "Login": "/todos/api/v1/login",
        "Logout": "/todos/api/v1/logout"
    }
    return Response(api_urls)

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.filter(user=request.user)
    serializer = TaskSerializer(tasks, many=True)
    print(tasks)
    return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
    task = Task.objects.get(id = pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):
    request.data['user'] = request.user.id
    serializer = TaskSerializer(data = request.data)
    if serializer.is_valid():
        serializer.validated_data['user'] = request.user
        serializer.save()
    else:
        print(serializer.errors)
    
    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id = pk)
    serializer = TaskSerializer(instance = task, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, pk):
    Task.objects.get(id = pk).delete()
    return Response('Task successfully deleted')


@api_view(['GET'])
def projectList(request):
    projects = Project.objects.filter(user = request.user)
    serializer = ProjectSerializer(projects, many=True)
    print(projects)
    return Response(serializer.data)


@api_view(['POST'])
def projectCreate(request):

    request.data['user'] = request.user.id
    print(request.data)
    serializer = ProjectSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)


#Registration/Login/Logout
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
            data['token']= Token.objects.get(user=user).key
            data['success'] = True
        else:
            data = serializer.errors
            data['success'] = False
        
        return JsonResponse(data)

@api_view(['POST'])
def login_view(request):
    if request.method == "POST":
        serializer = LoginSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.loginAccount()
            data['response'] = "Successfully logged in"
            try:
                token = Token.objects.get(user = user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
            data['token'] = token.key
            data['success'] = True
            data['user'] = user.email
        else:
            data = serializer.errors 
            data['success'] = False
            
        return JsonResponse(data)

@api_view(['POST'])
def logout_view(request):
    data = {}
    
    if(request.user.is_authenticated):
        data['response'] = "Logged Out"
        data['success'] = True
        Token.objects.get(user=request.user).delete()
    else:
        data['success'] = False
    return JsonResponse(data)


@api_view(['POST'])
def check_view(request):

    data = {}
    if(request.user.is_authenticated):
        data['response'] = f"Current user is {request.user}"
        data['success'] = True
    else:
        data['success'] = False
    print(data)
    
    return JsonResponse(data)
from django.core.exceptions import ValidationError
from django.db.models import fields
from rest_framework import serializers
from .models import Task, Project
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate, login, logout

class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(
                        min_length=8, 
                        write_only=True,
                        required=True,
                        style={'input_type': 'password'}
                        )
    confirm = serializers.CharField(
                        min_length=8, 
                        write_only=True,
                        required=True,
                        style={'input_type': 'password'}
                        )

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'confirm']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def saveAccount(self):

        username = self.validated_data['username']
        email = self.validated_data['email']
        password = self.validated_data['password']
        confirm = self.validated_data['confirm']

        user = User.objects.create_user(username=username, email=email)
        if password != confirm:
            raise serializers.ValidationError({'password': 'Passwords must match'})
       
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]
    
    def loginAccount(self):
        email = self.validated_data['email']
        password = self.validated_data['password']

        try:
            username = User.objects.get(email=email).username
        except User.DoesNotExist:
            raise serializers.ValidationError({'username': 'No user of that email address exists'})
        
        user = authenticate(username = username, password = password)
        if user is not None:
            return user
        else:
            raise serializers.ValidationError({'password':'Incorrect password'})
        

        

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields =  '__all__'

class TaskSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="User.username", read_only=True)
    class Meta:
        model = Task
        fields =  '__all__'
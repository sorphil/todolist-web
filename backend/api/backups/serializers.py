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
    
    # def loginAccount(self):
    #     email = self.validated_data['email']
    #     password = self.validated_data['password']
    #     if email and password:
    #         email_qs = User.objects.filter(email=email)
    #         if not email_qs.exists():
    #             raise serializers.ValidationError({'email': "Email doesn't exist"})
    #         else:
    #             user = authenticate(email=email, password=password)  
    #             print(email, password)
    #             if not user:
    #                 raise serializers.ValidationError("Incorrect password. Please try again!")
    #     return user

        

class ProjectSerializer(serializers.ModelSerializer):
    user = serializers.RelatedField(source = "user", read_only = True)
    class Meta:
        model = Project
        fields = ["title", "user"]

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.RelatedField(source = "user", read_only = True)
    project = serializers.RelatedField(source = "project", read_only = True)
    class Meta:
        model = Task
        fields = ["title", "completed", "pub_date", "due_date", "user", "project"]
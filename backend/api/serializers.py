from django.db.models import fields
from rest_framework import serializers
from .models import Task, Project
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(
                        min_length=6, 
                        write_only=True,
                        required=True,
                        style={'input_type': 'password'}
                        )
    password2 = serializers.CharField(
                        min_length=6, 
                        write_only=True,
                        required=True,
                        style={'input_type': 'password'}
                        )

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def saveAccount(self):

        username = self.validated_data['username']
        email = self.validated_data['email']
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        user = User.objects.create_user(username=username, email=email)

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match'})
       
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        

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
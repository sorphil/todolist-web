from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Task, Project
from django.contrib.auth.model import User


# Create your tests here.

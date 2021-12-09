from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from datetime import date
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.


class Project(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=CASCADE)
    def __str__(self):
        return f"{self.title} (Project) - {self.user}"

class Task(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False, blank=True)
    pub_date = models.DateField(default=date.today)
    due_date = models.DateField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=CASCADE)
    project = models.ForeignKey(Project, on_delete=CASCADE, null=True, blank=True)
    def __str__(self):
        return f"{self.title} (Task) - {self.user}"


@receiver(post_save, sender=User)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        Token.objects.create(user=instance)
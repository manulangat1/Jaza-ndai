# from django.db import models
from django.db.models import Manager as GeoManager
from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractUser
from django.shortcuts import reverse
from django.conf import settings
from timezone_field  import TimeZoneField
# Create your models here.
class User(AbstractUser):
    tel_no = models.CharField(max_length=18,default=0)
    pic = models.ImageField(upload_to='pictures/',blank=True,null=True)
    is_driver = models.BooleanField(default=False)
    is_rider = models.BooleanField(default=False)
    def __str__(self):
        return self.username
class Driver(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    
    def __str__(self):
        return "{} = {}".format(self.user.username,self.user.tel_no)
class Rider(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    
    def __str__(self):
        return "{} = {}".format(self.user.username,self.user.tel_no)
class Trip(models.Model):
    REQUESTED = 'REQUESTED'
    STARTED = 'STARTED'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'
    STATUSES = (
        (REQUESTED, REQUESTED),
        (STARTED, STARTED),
        (IN_PROGRESS, IN_PROGRESS),
        (COMPLETED, COMPLETED),
    )
    created = models.DateTimeField(auto_now_add=True)
    capacity = models.IntegerField(default=0)
    updated = models.DateTimeField(auto_now=True)
    pick_up_address = models.CharField(max_length=255)
    drop_off_address = models.CharField(max_length=255)
    status = models.CharField(
        max_length=20, choices=STATUSES, default=REQUESTED)
    driver = models.ForeignKey( # new
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='trips_as_driver'
        )
    rider = models.ManyToManyField( # new
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name='trips_as_rider'
    )
    geo_location = models.PointField(srid=4326,null=True,blank=True)
    geo_location_lat = models.CharField(max_length=100,null=True,blank=True)
    geo_location_long = models.CharField(max_length=100,null=True,blank=True)
    to_point = models.PointField(srid=4326,null=True,blank=True)
    # geo_objects = GeoManager()
    kms = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField(default=0)
    take_off_time = models.DateTimeField(blank=True,null=True)
    # time_zone = TimeZoneField(default='UTC',blank=True,null=True)
    def get_price(self):
        p = self.kms * 58
        self.price = p 
        self.price.save()
    def __str__(self):
        return self.status
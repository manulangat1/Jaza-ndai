from django.shortcuts import render
from django.contrib.gis.measure import D
from django.contrib.gis.measure import Distance  
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.geos import Point 
from .serializers import TripSerializer,LoginSerializer,UserSerilizer,RegisterSerilizer,ReadOnlyTripSerializer
from .models import Trip,User
from rest_framework import viewsets
from rest_framework import generics,permissions
from rest_framework.response import Response
import arrow
import dramatiq
from django.conf import settings
from twilio.rest import Client

from knox.models import AuthToken

from opencage.geocoder import OpenCageGeocode
from pprint import pprint
# from rest_framework import filters
from django.http import HttpResponse
from django_filters import FilterSet
from django_filters.rest_framework import DjangoFilterBackend,filters
client = Client(settings.TWILIO_ACCOUNT_SID,settings.TWILIO_AUTH_TOKEN)
key = "fbef4f421fde4fbfbb85ba15cc7ad502"
# Create your generics here.)
class TripView(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TripSerializer
    def get_queryset(self):
        lat = 1.2921
        lng = 36.8219
        radius = 10
        point = Point(lng, lat)  
        # return super().get_queryset()
        print(self.request.user)
        user = User.objects.filter(username=self.request.user).first()
        # print(user.geo_location)
        if user.is_rider == True:
            print("rider")
        return Trip.objects.filter(geo_location__distance_lte=(point, D(km=200)))
    def perform_create(self, serializer):
        user = User.objects.filter(username=self.request.user).first()
        if user.is_driver == True:
            q = self.request.data['pick_up_address']
            z = self.request.data['drop_off_address']
            geocoder = OpenCageGeocode(key)	
            query = f'{q}, Kenya'  	
            print(query)
            results = geocoder.geocode(query)
            print (results)
            lat = results[0]['geometry']['lat']
            lng = results[0]['geometry']['lng']
            print (lat, lng)
            location_point = Point(lng, lat)
            print(location_point)
            ######################
            query = f'{z}, Kenya'  	
            print(query)
            results = geocoder.geocode(query)
            print (results)
            lat = float(results[0]['geometry']['lat'])
            lng = float(results[0]['geometry']['lng'])
            print (lat, lng)
            drop_point = Point(lng, lat)
            print(drop_point)
            distance = location_point.distance(drop_point)
            distance_in_km = distance * 100
            print(distance_in_km)
            p1 = int(distance_in_km) * 4 
            serializer.save(kms=distance_in_km,
                price=p1,driver=self.request.user,
                geo_location=location_point,
                geo_location_lat=lat,
                geo_location_long=lng,
                to_point=drop_point
            )
        else:
            return Response({"You dont have permissions to add"})
class TripDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
class JoinTripView(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # if self.request.
        # print(instance.driver.tel_no)
        if instance.rider == self.request.user:
            print(instance.rider.count())
            return Response({"Already signed up"})
        if self.request.user == instance.driver:
            # print(instance.rider)
            return Response({"updatsuccessfully"})
        # if self.request.user in 
        if instance.rider.count() == instance.capacity:
            return Response("Car is already full")
        if self.request.user in instance.rider.all():
            print("Already sub")
        else:
            instance.rider.add(self.request.user)
            body = 'Hi {0}, You have booked a trip, Call the driver at {1} '.format(
                self.request.user,
                instance.driver.tel_no
            )
            user = User.objects.get(username=self.request.user)
            print(user.tel_no)
            client.messages.create(
                body=body,
                to=user.tel_no,
                from_=settings.TWILIO_NUMBER,
            )
            print(instance.rider.count())
            return Response({"Added successfully"})
        return Response({"updated successfully"})
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerilizer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerilizer(user,context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1]
        })
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerilizer(user,context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1]
        })
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerilizer
    def get_object(self):
        return self.request.user


def maps(request):
    trips = []
    for trip in Trip.objects.all():
        print(trip.geo_location[0],trip.geo_location[1])
        trips.append(trip.pick_up_address)
    print(trips)
    for trip in trips:
        geocoder = OpenCageGeocode(key)	
        query = f'{trip},Kenya'
        print(query)  	
        results = geocoder.geocode(query)
        lat = results[0]['geometry']['lat']
        lng = results[0]['geometry']['lng']
        # print (lat, lng)
    return HttpResponse({"Got is"})
class GetAllTrips(generics.ListAPIView):
    serializer_class = ReadOnlyTripSerializer
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    def get_queryset(self):
        user = User.objects.filter(username=self.request.user).first()
        return Trip.objects.filter(driver=user).all()
class GetAllRider(generics.ListAPIView):
    serializer_class = ReadOnlyTripSerializer
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    def get_queryset(self):
        user = User.objects.filter(username=self.request.user).first()
        return Trip.objects.filter(rider=user).all()
from django.shortcuts import get_object_or_404
class TripFilter(FilterSet):
    pick_up_address = filters.CharFilter('pick_up_address')
    drop_off_address = filters.CharFilter('drop_off_address')

    class Meta:
        model = Trip
        fields = ('pick_up_address','drop_off_address',)
class TripSearchView(generics.ListAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    filter_backends = (DjangoFilterBackend,)
    serializer_class = TripSerializer
    def get_queryset(self):
        return Trip.objects.all()
    filter_fields = ('pick_up_address','drop_off_address',)
    # filter_class = TripFilter
class TripDriver(generics.ListAPIView):
    serializer_class = UserSerilizer
    def get_queryset(self):
        # print(self.request.username)
        user = User.objects.all()
        return user
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('username',)
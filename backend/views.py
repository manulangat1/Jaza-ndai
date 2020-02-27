from django.shortcuts import render
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point 
from .serializers import TripSerializer,LoginSerializer,UserSerilizer,RegisterSerilizer
from .models import Trip,User
from rest_framework import viewsets
from rest_framework import generics,permissions
from rest_framework.response import Response

from knox.models import AuthToken

from opencage.geocoder import OpenCageGeocode
from pprint import pprint
from django.http import HttpResponse
key = "fbef4f421fde4fbfbb85ba15cc7ad502"
# Create your generics here.
def find_geo(q):
    geocoder = OpenCageGeocode(key)	
    query = f'{q}, Kenya'  	
    print(query)
    results = geocoder.geocode(query)
    print (results)
    lat = results[0]['geometry']['lat']
    lng = results[0]['geometry']['lng']
    print (lat, lng)
class TripView(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Trip.objects.all()
    # queryset = Trip.objects.filter(geo_location__distance_lte=(geo_location, D(km=10)))
    serializer_class = TripSerializer
    
    def perform_create(self, serializer):
        q = self.request.data['pick_up_address']
        z = self.request.data['drop_off_address']
        # find_geo(q)
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
        lat = results[0]['geometry']['lat']
        lng = results[0]['geometry']['lng']
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
            to_point=drop_point
        )
    # print (list_lat, list_long)
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
        # print(request.data)
        instance = self.get_object()
        if instance.rider == self.request.user:
            print(instance.rider.count())
            return Response({"Already signed up"})
        if self.request.user == instance.driver:
            print(instance.rider)
            return Response({"updated successfully"})
        if instance.rider.count() == instance.capacity:
            return Response("Car is already full")
        instance.rider.add(self.request.user)
        print(instance.rider.count())
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
        trips.append(trip.pick_up_address)
    print(trips)
    for trip in trips:
        geocoder = OpenCageGeocode(key)	
        query = f'{trip},Kenya'
        print(query)  	
        results = geocoder.geocode(query)
        lat = results[0]['geometry']['lat']
        lng = results[0]['geometry']['lng']
        print (lat, lng)
    return HttpResponse({"Got is"})
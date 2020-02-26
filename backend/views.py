from django.shortcuts import render

from .serializers import TripSerializer,LoginSerializer,UserSerilizer,RegisterSerilizer
from .models import Trip,User
from rest_framework import viewsets
from rest_framework import generics,permissions
from rest_framework.response import Response

from knox.models import AuthToken
# Create your generics here.

class TripView(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def perform_create(self, serializer):
        p = self.request.data['kms'] 
        p1 = int(p) * 4
        # print(self.request.data['kms'])
        serializer.save(price=p1,driver=self.request.user)
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

from opencage.geocoder import OpenCageGeocode
from pprint import pprint
from django.http import HttpResponse
key = "ff7815864d3c4b8f878f64122c64894b"
def maps(request):
    geocoder = OpenCageGeocode(key)	
    query = 'Nyagacho,kericho, Kenya'  	
    results = geocoder.geocode(query)
    print (results)
    return HttpResponse({"Got is"})
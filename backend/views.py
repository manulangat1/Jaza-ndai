from django.shortcuts import render


from .serializers import TripSerializer,LoginSerializer,UserSerilizer,RegisterSerilizer
from .models import Trip,User
from rest_framework import viewsets
from rest_framework import generics,permissions
from rest_framework.response import Response

from knox.models import AuthToken
# Create your generics here.

class TripView(generics.ListCreateAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def perform_create(self, serializer):
        # p = validated_data.pop('kms') * 17 
        p = self.request.data['kms'] 
        p1 = int(p) * 4
        # print(self.request.data['kms'])
        serializer.save(price=p1,driver=self.request.user)
class TripDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

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

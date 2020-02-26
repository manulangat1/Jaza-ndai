from django.urls import path,include
from . import views
from knox import views as knox_views
urlpatterns = [
    path('api/auth',include('knox.urls')),
    path('map/',views.maps),
    path('trip/',views.TripView.as_view()),
    path('trip/<pk>/',views.TripDetailView.as_view()),
    path('trips/<pk>/',views.JoinTripView.as_view()),
    path('register/',views.RegisterAPI.as_view()),
    path('login/',views.LoginAPI.as_view()),
    path('user/',views.UserAPI.as_view()),
    path('logout/',knox_views.LogoutView.as_view())
]
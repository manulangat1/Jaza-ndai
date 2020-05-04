from import_export import resources
from .models import Trip,User,Driver,Rider

class PersonResource(resources.ModelResource):
    class Meta:
        model = User
class TripResource(resources.ModelResource):
    class Meta:
        model = Trip
class DriverResource(resources.ModelResource):
    class Meta:
        model = Driver
class RiderResource(resources.ModelResource):
    class Meta:
        model = Rider
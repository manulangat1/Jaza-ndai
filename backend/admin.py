from django.contrib import admin
from .models import Trip,User,Driver,Rider
# Register your models here.
admin.site.register(Trip)
admin.site.register(User)
admin.site.register(Driver)
admin.site.register(Rider)
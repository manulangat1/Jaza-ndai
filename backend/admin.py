from django.contrib import admin
from .models import Trip,User,Driver,Rider,Payments,Review
# Register your models here.
admin.site.site_header = 'Lets Car Pool Admin'
admin.site.site_title = 'Lets Car Pool'
admin.site.register(Trip)
admin.site.register(User)
admin.site.register(Driver)
admin.site.register(Rider)
admin.site.register(Payments)
admin.site.register(Review)
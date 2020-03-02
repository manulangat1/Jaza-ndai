import arrow
import dramatic 
from django.conf import settings
from twilio.rest import Client

from .models import Trip
client = Client(settings.TWILIO_ACCOUNT_SID,settings.TWILIO_AUTH_TOKEN)

@dramatiq.actor
def send_sms_reminder(id):
    try:
        trip = Trip.objects.get(id=id)
    except Trip.DoesNotExist:
        return 
    take_off_time = arrow.get(trip.take_off_time,trip.time_zone.zone)
    body = 'Hi {0}.You have a ride taking off at {1}'.format(self.request.user,trip.take_off_time.format('h:mm a'))
    client.messages.create(
        body=body,
        to='0715127467',
        from_=settings.TWILIO_NUMBER,
    )
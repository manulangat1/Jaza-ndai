from celery import shared_task
# from .views import checkTime
from celery.utils.log import get_task_logger
from celery.task.schedules import crontab
from celery.decorators import periodic_task,task
import time
from datetime import date,datetime
from .models import Trip
from django.http import HttpResponse 
# from feedback.emails import send_feedback_email

logger = get_task_logger(__name__)
def checkTimes():
    for i in Trip.objects.filter(status="REQUESTED").all():
        # checkTime_async()
        if i.take_off_date == date.today():
            now = datetime.now().time()
            print("date",i.take_off_date)
            print("time",i.take_off)
            # print(time.time())
            z = datetime.combine(date.today(), i.take_off) - datetime.combine(date.today(), now)
            x = z.total_seconds()/ 60
            if i.status == "REQUESTED":
                # now = datetime.now().time().strftime("%H:%M:%S")
                if x  <= 30:
                    print("almost")
                    i.status = "STARTED"
                    i.save()
    return print("Also done")
def checkIn():
    for i in Trip.objects.filter(status="STARTED").all():
        print("STARTED")
        if i.take_off_date == date.today():
            now = datetime.now().time()
            print("date",i.take_off_date)
            print("time",i.take_off)
            # print(time.time())
            z = datetime.combine(date.today(), i.take_off) - datetime.combine(date.today(), now)
            x = z.total_seconds()/ 60
            if i.status == "STARTED":
                    if x  <= 2 :
                        print(x)
                        print("starting in two minutes")
                        i.status = "IN_PROGRESS"
                        i.save()
                        print("Take off")
                    else:
                        print("Dont Take off")
    return print("done!!")
@shared_task(name="update trip status")
def checkTime_async():
    logger.info("Sent feedback email")
    checkTimes()
    logger.info("Sent feedback email")
    checkIn()

@periodic_task(run_every=(crontab(minute='*/1')), name="update status", ignore_result=True)
def some_task():
    # do something
    logger.info("Sent feedback email")
    checkTimes()
    logger.info("Sent feedback email")
    checkIn()
from django.core import management
@periodic_task(run_every=(crontab(minute=0,hour=0)), name="archive db", ignore_result=True)
def some_task():
    # do something
    management.call_command("archive", verbosity=0)
    return "success"
    logger.info("Sent feedback")

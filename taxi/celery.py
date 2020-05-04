import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taxi.settings')

app = Celery('taxi')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
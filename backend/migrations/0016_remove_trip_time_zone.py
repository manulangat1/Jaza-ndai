# Generated by Django 3.0.3 on 2020-03-02 17:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_trip_time_zone'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trip',
            name='time_zone',
        ),
    ]

# Generated by Django 3.0.3 on 2020-02-27 07:36

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_auto_20200227_0731'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='geo_location',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326),
        ),
    ]

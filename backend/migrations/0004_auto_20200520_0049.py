# Generated by Django 3.0.3 on 2020-05-19 21:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20200519_1639'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='ride',
        ),
        migrations.AddField(
            model_name='review',
            name='driver',
            field=models.ForeignKey(default=django.utils.timezone.now, on_delete=django.db.models.deletion.CASCADE, related_name='driver_review', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

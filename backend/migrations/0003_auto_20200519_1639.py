# Generated by Django 3.0.3 on 2020-05-19 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_remove_review_avg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='courtesy',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
    ]

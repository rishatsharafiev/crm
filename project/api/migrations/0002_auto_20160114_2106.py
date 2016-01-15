# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-14 18:06
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='employee',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a'),
        ),
        migrations.AlterField(
            model_name='project',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='\u0412\u043b\u0430\u0434\u0435\u043b\u0435\u0446'),
        ),
        migrations.AlterField(
            model_name='subdivision',
            name='manager',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='manager', to=settings.AUTH_USER_MODEL, verbose_name='\u0420\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c'),
        ),
        migrations.AlterField(
            model_name='task',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL, verbose_name='\u041f\u043e\u0441\u0442\u0430\u043d\u043e\u0432\u0449\u0438\u043a'),
        ),
        migrations.AlterField(
            model_name='task',
            name='responsible',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responsible', to=settings.AUTH_USER_MODEL, verbose_name='\u041e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439'),
        ),
    ]
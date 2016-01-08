# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-08 21:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20160109_0005'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.AddField(
            model_name='comment',
            name='employee',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='api.Employee', verbose_name='\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='comment',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='task',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Task', verbose_name='\u0417\u0430\u0434\u0430\u0447\u0430'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='text',
            field=models.TextField(verbose_name='\u0422\u0435\u043a\u0441\u0442 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f'),
        ),
        migrations.AlterField(
            model_name='commentpicture',
            name='comment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Comment', verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439'),
        ),
        migrations.AlterField(
            model_name='project',
            name='description',
            field=models.CharField(max_length=1000, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430'),
        ),
        migrations.AlterField(
            model_name='project',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Employee', verbose_name='\u0412\u043b\u0430\u0434\u0435\u043b\u0435\u0446'),
        ),
        migrations.AlterField(
            model_name='project',
            name='title',
            field=models.CharField(max_length=300, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430'),
        ),
        migrations.AlterField(
            model_name='task',
            name='base_task',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Task', verbose_name='\u0411\u0430\u0437\u043e\u0432\u0430\u044f \u0437\u0430\u0434\u0430\u0447\u0430'),
        ),
        migrations.AlterField(
            model_name='task',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f'),
        ),
        migrations.AlterField(
            model_name='task',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Project', verbose_name='\u041f\u0440\u043e\u0435\u043a\u0442'),
        ),
        migrations.AlterField(
            model_name='task',
            name='text',
            field=models.TextField(verbose_name='\u0422\u0435\u043a\u0441\u0442 \u0437\u0430\u0434\u0430\u0447\u0438'),
        ),
        migrations.AlterField(
            model_name='task',
            name='title',
            field=models.CharField(max_length=300, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438'),
        ),
        migrations.AlterField(
            model_name='taskpicture',
            name='task',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Task', verbose_name='\u0417\u0430\u0434\u0430\u0447\u0430'),
        ),
    ]
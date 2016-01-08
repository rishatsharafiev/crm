# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.ForeignKey(User)
    def __unicode__(self):
        return u'%s' % (self.user.username)

    class Meta:
        verbose_name = u'Сотрудник'
        verbose_name_plural = u'Сотрудники'

class Project(models.Model):
    title = models.CharField(max_length=300, verbose_name='Название проекта')
    description = models.CharField(max_length=1000, blank=True, verbose_name='Описание проекта')
    owner = models.ForeignKey(Employee, verbose_name='Владелец')

    def __unicode__(self):
        return u'%s' % (self.title)

    class Meta:
        verbose_name = u'Проект'
        verbose_name_plural = u'Проекты'

class Task(models.Model):
    title = models.CharField(max_length=300, verbose_name='Название задачи')
    text = models.TextField(verbose_name='Текст задачи')
    base_task = models.ForeignKey('self', blank=True, null=True, verbose_name='Базовая задача')
    project = models.ForeignKey(Project, verbose_name='Проект')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __unicode__(self):
        return u'%s %s' % (self.title, self.created_date.strftime("%A, %d. %B %Y %I:%M%p"))

    class Meta:
        ordering = ('created_date',)
        verbose_name = u'Задача'
        verbose_name_plural = u'Задачи'

class TaskPicture(models.Model):
    path = models.ImageField(upload_to='pictures/%Y/%m/%d', verbose_name='Изображение')
    task = models.ForeignKey(Task, verbose_name='Задача')

    class Meta:
        verbose_name = u'Изображение из задачи'
        verbose_name_plural = u'Изображения из задач'

class Comment(models.Model):
    task = models.ForeignKey(Task, verbose_name='Задача')
    text = models.TextField(verbose_name='Текст комментария')
    employee = models.ForeignKey(Employee, verbose_name='Сотрудник')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __unicode__(self):
        return u'%s %s %s' % (self.pk, self.task.title, self.created_date.strftime("%A, %d. %B %Y %I:%M%p"))

    class Meta:
        ordering = ('created_date',)
        verbose_name = u'Комментарий'
        verbose_name_plural = u'Комментарии'

class CommentPicture(models.Model):
    path = models.ImageField(upload_to='pictures/%Y/%m/%d', verbose_name='Изображение')
    comment = models.ForeignKey(Comment, verbose_name='Комментарий')

    class Meta:
        verbose_name = u'Изображение из комментария'
        verbose_name_plural = u'Изображения из комментариев'
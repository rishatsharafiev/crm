# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.db import models
from django.db.models import Q, F

from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subdivision = models.ForeignKey('Subdivision', blank=True, null=True, verbose_name='Подразделение')
    avatar = models.ImageField(upload_to='pictures/employees/%Y/%m/%d', blank=True, null=True, verbose_name='Аватар')

    def __unicode__(self):
        return u'%s %s' % (self.user.first_name, self.user.last_name)

    class Meta:
        verbose_name = u'Сотрудник'
        verbose_name_plural = u'Сотрудники'

class Subdivision(models.Model):
    title = models.CharField(max_length=300, verbose_name='Название')
    description = models.TextField(max_length=1000, blank=True, verbose_name='Описание')
    manager = models.ForeignKey(User, verbose_name='Руководитель', related_name='manager')

    def __unicode__(self):
        return u'%s' % (self.title)

    class Meta:
        verbose_name = u'Подразделение'
        verbose_name_plural = u'Подразделения'

class Project(models.Model):
    title = models.CharField(max_length=300, verbose_name='Название')
    description = models.TextField(max_length=1000, blank=True, verbose_name='Описание')
    owner = models.ForeignKey(User, verbose_name='Владелец')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')

    def __unicode__(self):
        return u'%s' % (self.title)

    class Meta:
        verbose_name = u'Проект'
        verbose_name_plural = u'Проекты'

class Task(models.Model):
    STATUS_CHOICES = (
        (0, 'Новый'),
        (1, 'В процессе'),
        (2, 'Завершено'),
        (3, 'Проверено'),
    )
    PRIORITY_CHOICES = (
        (0, 'Низкий'),
        (1, 'Средний'),
        (2, 'Высокий'),
    )

    title = models.CharField(max_length=300, verbose_name='Название')
    text = models.TextField(verbose_name='Текст')
    base_task = models.ForeignKey('self', blank=True, null=True, verbose_name='Базовая задача')
    project = models.ForeignKey(Project, verbose_name='Проект')
    owner = models.ForeignKey(User, verbose_name='Постановщик', related_name='owner')
    responsible = models.ForeignKey(User, verbose_name='Ответственный', related_name='responsible')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')
    priority = models.PositiveSmallIntegerField(choices=PRIORITY_CHOICES, default=0, verbose_name='Приоритет')
    status = models.PositiveSmallIntegerField(choices=STATUS_CHOICES, default=0, verbose_name='Статус')

    def __unicode__(self):
        return u'%s' % (self.title)

    class Meta:
        ordering = ('created_date',)
        verbose_name = u'Задача'
        verbose_name_plural = u'Задачи'

# class TaskPicture(models.Model):
#     path = models.ImageField(upload_to='pictures/tasks/%Y/%m/%d', verbose_name='Изображение')
#     task = models.ForeignKey(Task, verbose_name='Задача')

#     class Meta:
#         verbose_name = u'Изображение из задачи'
#         verbose_name_plural = u'Изображения из задач'

class Comment(models.Model):
    task = models.ForeignKey(Task, verbose_name='Задача')
    text = models.TextField(verbose_name='Текст комментария')
    employee = models.ForeignKey(User, verbose_name='Сотрудник')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')

    def __unicode__(self):
        return u'%s %s %s' % (self.pk, self.task.title, self.created_date.strftime("%A, %d. %B %Y %I:%M%p"))

    class Meta:
        ordering = ('created_date',)
        verbose_name = u'Комментарий'
        verbose_name_plural = u'Комментарии'

# class CommentPicture(models.Model):
#     path = models.ImageField(upload_to='pictures/comments/%Y/%m/%d', verbose_name='Изображение')
#     comment = models.ForeignKey(Comment, verbose_name='Комментарий')

#     class Meta:
#         verbose_name = u'Изображение из комментария'
#         verbose_name_plural = u'Изображения из комментариев'
from django.db import models


CATEGORIS= [
    ("all", "Все"),
    ("voyge","Путишествия"),
    ("famaly","Семья"),
    ("party","Мероприятия"),
    ("birthday","Дни рождания"),
    
]
class Albom(models.Model):
    name = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateField()
    category = models.CharField(max_length=255, choices=CATEGORIS, default= CATEGORIS[0][0])

class Photo(models.Model):
    order = models.IntegerField(default=0)
    image = models.ImageField()
    albom = models.ForeignKey(Albom, on_delete=models.CASCADE)
    comment = models.CharField(max_length=255, default="", blank=True)

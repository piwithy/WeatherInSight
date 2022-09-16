from django.db import models


# Create your models here.
class Hits(models.Model):
    date_creation = models.DateTimeField('date created')
    count = models.IntegerField(default=0)

    def __str__(self):
        return "Hits id=" + str(self.id)

from django.contrib import admin

from .models import Sol, Sensor, WindSector

# Register your models here.
admin.site.register(Sol)
admin.site.register(Sensor)
admin.site.register(WindSector)

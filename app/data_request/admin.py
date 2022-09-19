from django.contrib import admin
from .models import SolDayData, WindDirection, WindSector, SensorData

# Register your models here.
admin.site.register(SolDayData)
admin.site.register(WindSector)
admin.site.register(WindDirection)
admin.site.register(SensorData)

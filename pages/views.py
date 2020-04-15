from django.shortcuts import render, get_object_or_404
from django.core import exceptions
from django.utils import timezone

from data_request.utils import request_data, sensor_data_2_json, wind_data_2_json
from data_request.models import SolDayData, SensorData, WindSector

import socket

from .models import Hits


# Create your views here.
def index(request):
    try:
        hits = Hits.objects.latest('-date_creation')
    except exceptions.ObjectDoesNotExist as e:
        hits = Hits()
        hits.date_creation = timezone.now()
    hits.count += 1
    host = str(socket.gethostname())
    hits.save()
    return render(request, 'pages/index.html', {'hits': hits.count, 'host': host})


def list_view(request):
    header, body = request_data()
    sol_days = SolDayData.objects.all().order_by('-sol_date').filter(validated__gt=0)
    return render(request, 'pages/list_view.html', {'sol_days': sol_days})


def detail_view(request, sol_key):
    sol_day = get_object_or_404(SolDayData, sol_date=sol_key)
    sensors = SensorData.objects.filter(sol_day__exact=sol_day)
    wind_sectors = WindSector.objects.filter(wind_directions__sol_day__exact=sol_day)
    env = {
        'sol_day': sol_day,
        'sensors': sensors,
        'wind_sectors': wind_sectors,
    }
    return render(request, 'pages/detail.html', env)


def wind_rose(request, sol_key):
    sol_day = get_object_or_404(SolDayData, sol_date=sol_key)
    env = {
        'sol_day': sol_day,
        'sensor_data': sensor_data_2_json(sol_day),
        'wind_sectors': wind_data_2_json(sol_day)
    }
    return render(request, 'pages/wind_rose.html', env)

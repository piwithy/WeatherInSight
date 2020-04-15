from django.shortcuts import render, get_object_or_404
from .utils import wind_data_2_json, request_data, sensor_data_2_json

from .models import SolDayData, SensorData, WindDirection, WindSector

import requests as req
import json


# Create your views here.


def request_viewer(request):
    header_data, body_data = request_data()
    return render(request, 'data_request/request_viewer.html',
                  {'header_data': dict(header_data), 'body_data': body_data})


def wind_rose(request, sol_date):
    sol_day = get_object_or_404(SolDayData, sol_date=sol_date)
    env = {
        'sol_day': sol_day,
        'sensor_data': sensor_data_2_json(sol_day),
        'wind_sectors': wind_data_2_json(sol_day)
    }
    return render(request, 'data_request/wind_rose.html', env)

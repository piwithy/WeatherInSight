from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.core import exceptions
from django.views import generic

from .models import SolDayData, SensorData, WindDirection, WindSector

import requests as req
import json


# Create your views here.
def index(request):
    header, body = request_data()
    sol_days = SolDayData.objects.all().order_by('-sol_date').filter(validated__gt=0)
    return render(request, 'data_request/index.html', {'sol_days': sol_days})


def request_viewer(request):
    header_data, body_data = request_data()
    return render(request, 'data_request/request_viewer.html',
                  {'header_data': dict(header_data), 'body_data': body_data})


def request_data():
    request_payload = {'api_key': '0kMpoH8aN2R7tA8P7AyhLfY4U8yvDhEWVcQoQ8Gz', 'feedtype': 'json', 'version': '1.0'}
    get_request = req.get("https://api.nasa.gov/insight_weather/", params=request_payload)
    if get_request.status_code != 200:
        return HttpResponse(status=get_request.status_code)
    body_data_raw = get_request.text
    body_data_json = json.loads(body_data_raw)
    sol_keys = body_data_json.get("sol_keys").copy()
    validity_checks = body_data_json.get("validity_checks").copy()
    body_data_json.pop('sol_keys')
    body_data_json.pop('validity_checks')
    for key, item in body_data_json.items():
        valid = key in validity_checks.get("sols_checked")
        try:
            sol_day = SolDayData.objects.get(sol_date=int(key))
            if not sol_day.is_validated() and valid:
                sol_day.update_data(item, valid)
                sol_day.save()
        except exceptions.ObjectDoesNotExist as e:
            sol_day = SolDayData.create(key, item, valid)
            sol_day.save()
        except exceptions.MultipleObjectsReturned as e:
            return HttpResponse(status=500)
    return get_request.headers, json.loads(body_data_raw)


def detail(request, sol_date):
    sol_day = get_object_or_404(SolDayData, sol_date=sol_date)
    sensors = SensorData.objects.filter(sol_day__sol_date__exact=sol_date)

    wind_sectors = WindSector.objects.filter(wind_directions__sol_day__sol_date=sol_date)
    env = {
        'sol_date': sol_date,
        'sol_day': sol_day,
        'sensors': sensors,
        'wind_sectors': wind_sectors,
    }
    return render(request, 'data_request/detail.html', env)

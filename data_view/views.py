from django.shortcuts import render, get_object_or_404
from django.core import exceptions
from django.utils import timezone
from data_request import utils, models

from pages.models import Hits


# Create your views here.
def index(request):
    data = request.session['data']
    try:
        hits = Hits.objects.latest('-date_creation')
    except exceptions.ObjectDoesNotExist as e:
        hits = Hits()
        hits.date_creation = timezone.now()
    hits.count += 1
    hits.save()
    env = {
        'hits': hits.count,
        'lang': data['lang']
    }
    return render(request, 'data_view/index.html', env)


def data_index(request):
    data = request.session['data']
    try:
        hits = Hits.objects.latest('-date_creation')
    except exceptions.ObjectDoesNotExist as e:
        hits = Hits()
        hits.date_creation = timezone.now()
    hits.count += 1
    hits.save()
    env = {
        'hits': hits.count,
        'lang': data['lang']
    }
    return render(request, 'data_view/index.html', env)


def list_view(request):
    utils.request_data()
    data = request.session['data']
    env = {
        'lang': data['lang'],
        'sol_days': utils.sol_days_2_json()
    }
    return render(request, 'data_view/list_view.html', env)


def details_view(request):
    data = request.session['data']
    sol_day = get_object_or_404(models.SolDayData, sol_date=int(data['sol_key']))
    env = {
        'lang': data['lang'],
        'sol_day': utils.sol_data_2_json(sol_day),
        'sensors': utils.sensor_data_2_json(sol_day),
        'wind_sectors': utils.wind_data_2_json(sol_day),
    }
    return render(request, 'data_view/details_view.html', env)


def wind_rose_view(request):
    data = request.session['data']
    sol_day = get_object_or_404(models.SolDayData, sol_date=int(data['sol_key']))
    env = {
        'lang': data['lang'],
        'sol_day': utils.sol_data_2_json(sol_day),
        'sensors': utils.sensor_data_2_json(sol_day),
        'wind_sectors': utils.wind_data_2_json(sol_day),
    }
    return render(request, 'data_view/wind_rose_view.html', env)


def request_view(request):
    data = request.session['data']
    header, body = utils.request_data()
    env = {
        'lang': data['lang'],
        'header': dict(header),
        'body': dict(body),
    }
    return render(request, 'data_view/request_view.html', env)

import json
import requests as req
from django.core import exceptions

from .models import SolDayData, WindSector, SensorData


def wind_data_2_json(sol_day: SolDayData):
    wind_sectors = WindSector.objects.filter(wind_directions__sol_day__exact=sol_day)
    wind_sectors_dict = {}
    cnt = 0
    for sector in wind_sectors:
        sector_dict = {
            'compass_degrees': sector.compass_degrees,
            'compass_point': sector.compass_point,
            'compass_right': sector.compass_right,
            'compass_up': sector.compass_up,
            'ct': sector.ct,
        }
        if sector.sector == -1:
            wind_sectors_dict['most_common'] = sector_dict
        else:
            cnt += sector.ct
            wind_sectors_dict[str(sector.sector)] = sector_dict
    wind_sectors_dict['cnt'] = cnt
    return wind_sectors_dict


def sensor_data_2_json(sol_day: SolDayData):
    sensors = SensorData.objects.filter(sol_day__exact=sol_day)
    sensors_dict = {}
    for sensor in sensors:
        sensor_dict = {
            'av': sensor.average_value,
            'mn': sensor.minimum_value,
            'mx': sensor.maximum_value,
            'ct': sensor.sample_count,
        }
        sensors_dict[sensor.sensor] = sensor_dict
    return sensors_dict


def sol_data_2_json(sol_day: SolDayData):
    data = {
        'sol_date': sol_day.sol_date,
        'season': sol_day.season,
        'First_UTC': sol_day.first_utc,
        'Last_UTC': sol_day.last_utc
    }
    return data


def request_data():
    request_payload = {'api_key': '0kMpoH8aN2R7tA8P7AyhLfY4U8yvDhEWVcQoQ8Gz', 'feedtype': 'json', 'version': '1.0'}
    get_request = req.get("https://api.nasa.gov/insight_weather/", params=request_payload)
    if get_request.status_code != 200:
        raise exceptions.RequestAborted
    body_data_raw = get_request.text
    body_data_json = json.loads(body_data_raw)
    sol_keys = body_data_json.get("sol_keys").copy()
    validity_checks = body_data_json.get("validity_checks").copy()
    body_data_json.pop('sol_keys')
    body_data_json.pop('validity_checks')
    for key, item in body_data_json.items():
        valid = check_sol_valid(key, validity_checks)
        try:
            sol_day = SolDayData.objects.get(sol_date=int(key))
        except exceptions.ObjectDoesNotExist as e:
            if valid:
                sol_day = SolDayData.create(key, item, valid)
                sol_day.save()
        except exceptions.MultipleObjectsReturned as e:
            return exceptions.EmptyResultSet
    return get_request.headers, json.loads(body_data_raw)


def check_sol_valid(sol_key, validity_checks):
    if sol_key not in validity_checks['sols_checked']:
        return False
    if validity_checks[sol_key].get('AT', None) is not None:
        if not validity_checks[sol_key]['AT'].get('valid', False):
            return False
    if validity_checks[sol_key].get('HWS', None) is not None:
        if not validity_checks[sol_key]['HWS'].get('valid', False):
            return False
    if validity_checks[sol_key].get('PRE', None) is not None:
        if not validity_checks[sol_key]['PRE'].get('valid', False):
            return False
    if validity_checks[sol_key].get('WD', None) is not None:
        if not validity_checks[sol_key]['WD'].get('valid', False):
            return False
    return True

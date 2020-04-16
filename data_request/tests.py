from django.test import TestCase

from WeatherInSight import settings
from .models import WindSector, WindDirection, SolDayData, SensorData

from .utils import check_sol_valid

import json


# Create your tests here.
class WindSectorModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        body_data_raw = open(settings.BASE_DIR + '/data_request/static/data_request/sample_request.json')
        body_data_json = json.load(body_data_raw)
        # print(body_data_json)
        sol_keys = body_data_json.get("sol_keys").copy()
        validity_checks = body_data_json.get("validity_checks").copy()
        body_data_json.pop('sol_keys')
        body_data_json.pop('validity_checks')
        for key, item in body_data_json.items():
            valid = check_sol_valid(key, validity_checks)
            if valid:
                sol_day = SolDayData.create(key, item, valid)
                sol_day.save()

    def setUp(self):
        sol492 = SolDayData.objects.filter(sol_date__exact="492")[0]
        sectors = WindSector.objects.filter(wind_directions__sol_day__exact=sol492)
        self.sectors_dict = {}
        for sector in sectors:
            self.sectors_dict[sector.sector] = sector

    def test_wind_sector_creation(self):
        """ Sector 0 Creation Test
        Checking that the data for Sector 0 is coherent with request sample used:
        json:
        "0": {
            "compass_degrees": 0.0,
            "compass_point": "N",
            "compass_right": 0.0,
            "compass_up": 1.0,
            "ct": 373
        },
        """
        th_dict = {
            "sector": 0,
            "compass_degrees": 0.0,
            "compass_point": "N",
            "compass_right": 0.0,
            "compass_up": 1.0,
            "ct": 373.0
        }
        sector_0 = self.sectors_dict.get(0, None)
        self.assertNotEqual(sector_0, None)  # Check if Sector Exist
        sector_0_dict = {
            "sector": sector_0.sector,
            "compass_degrees": sector_0.compass_degrees,
            "compass_point": sector_0.compass_point,
            "compass_right": sector_0.compass_right,
            "compass_up": sector_0.compass_up,
            "ct": sector_0.ct
        }
        for key, item in sector_0_dict.items():
            self.assertEqual(th_dict[key], item, "checking equality for key:" + str(key))  # checking Key Equality

    def test_wind_sector_update(self):
        """
        Checking if the data is correctly updated
        """
        th_dict = {
            "sector": 0,
            "compass_degrees": 0.0,
            "compass_point": "N",
            "compass_right": 0.0,
            "compass_up": 1.0,
            "ct": 373.0
        }
        sector_0 = self.sectors_dict.get(0, None)
        self.assertNotEqual(sector_0, None)  # Check if Sector Exist
        sector_0_dict_orig = {
            "sector": sector_0.sector,
            "compass_degrees": sector_0.compass_degrees,
            "compass_point": sector_0.compass_point,
            "compass_right": sector_0.compass_right,
            "compass_up": sector_0.compass_up,
            "ct": sector_0.ct
        }
        for key, item in sector_0_dict_orig.items():
            self.assertEqual(th_dict[key], item, "checking equality for key:" + str(key))  # checking Key Equality
        th_dict = {
            "sector": 0,
            "compass_degrees": 45.0,
            "compass_point": "NE",
            "compass_right": 10.0,
            "compass_up": 1.5,
            "ct": 200
        }
        sector_0.update_data(th_dict)
        sector_0_dict_updated = {
            "sector": sector_0.sector,
            "compass_degrees": sector_0.compass_degrees,
            "compass_point": sector_0.compass_point,
            "compass_right": sector_0.compass_right,
            "compass_up": sector_0.compass_up,
            "ct": sector_0.ct
        }
        for key, item in sector_0_dict_updated.items():
            self.assertEqual(th_dict[key], item, "checking equality for key:" + str(key))  # checking Key Equality
            self.assertNotEqual(sector_0_dict_orig, item, "checking inequality for key:" + str(key))
        sector_0.update_data(
            {"sector": 0, "compass_degrees": 0.0, "compass_point": "N", "compass_right": 0.0, "compass_up": 1.0,
             "ct": 373.0})

    def test_str(self):
        """
        Testing conversion to str
        """
        sector_0 = self.sectors_dict.get(0, None)
        self.assertNotEqual(sector_0, None)  # Check if Sector Exist
        sector_0_str = str(sector_0)
        sector_0_str_th = "N" + ", ct:" + str(373.0)
        self.assertEqual(sector_0_str, sector_0_str_th, 'testing to string for normal Sector')

        sector_mc = self.sectors_dict.get(-1, None)
        self.assertNotEqual(sector_mc, None)  # Check if Sector Exist
        sector_0_str = str(sector_mc)
        sector_0_str_th = "MOST COMMON Direction " + "SW" + ", ct:" + str(18432.0)
        self.assertEqual(sector_0_str, sector_0_str_th, 'testing to string for most common Sector')


class SensorDataModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        body_data_raw = open(settings.BASE_DIR + '/data_request/static/data_request/sample_request.json')
        body_data_json = json.load(body_data_raw)
        # print(body_data_json)
        sol_keys = body_data_json.get("sol_keys").copy()
        validity_checks = body_data_json.get("validity_checks").copy()
        body_data_json.pop('sol_keys')
        body_data_json.pop('validity_checks')
        for key, item in body_data_json.items():
            valid = check_sol_valid(key, validity_checks)
            if valid:
                sol_day = SolDayData.create(key, item, valid)
                sol_day.save()

    def setUp(self):
        sol492 = SolDayData.objects.filter(sol_date__exact="492")[0]
        sensors = SensorData.objects.filter(sol_day__exact=sol492)
        self.sensors_dict = {}
        for sensor in sensors:
            self.sensors_dict[sensor.sensor] = sensor

    def test_sensor_data_creation(self):
        """ Sector 0 Creation Test
        Checking that the data for Sector 0 is coherent with request sample used:
        json:
        "AT": {
            "av": -54.007,
            "ct": 140938,
            "mn": -94.386,
            "mx": -5.461
        },
        """
        th_dict = {
            "sensor": 'AT',
            "average_value": -54.007,
            "sample_count": 140938,
            "minimum_value": -94.386,
            "maximum_value": -5.461
        }
        at_sensor = self.sensors_dict.get('AT', None)
        self.assertNotEqual(at_sensor, None)  # Check if Sector Exist
        at_sensor_dict = {
            "sensor": at_sensor.sensor,
            "average_value": at_sensor.average_value,
            "sample_count": at_sensor.sample_count,
            "minimum_value": at_sensor.minimum_value,
            "maximum_value": at_sensor.maximum_value
        }
        for key, item in at_sensor_dict.items():
            self.assertEqual(th_dict[key], item, "checking equality for key:" + str(key))  # checking Key Equality

    def test_sensor_data_update(self):
        """
        Checking if the data is correctly updated
        """
        th_dict = {
            "sensor": 'AT',
            "average_value": -54.007,
            "sample_count": 140938,
            "minimum_value": -94.386,
            "maximum_value": -5.461
        }
        at_sensor = self.sensors_dict.get('AT', None)
        self.assertNotEqual(at_sensor, None)  # Check if Sector Exist
        at_sensor_dict_orig = {
            "sensor": at_sensor.sensor,
            "average_value": at_sensor.average_value,
            "sample_count": at_sensor.sample_count,
            "minimum_value": at_sensor.minimum_value,
            "maximum_value": at_sensor.maximum_value
        }
        for key, item in at_sensor_dict_orig.items():
            self.assertEqual(th_dict[key], item, "checking equality for key:" + str(key))  # checking Key Equality
        th_dict = {
            "sensor": 'AT',
            "av": -60.007,
            "ct": 200938,
            "mn": -100.386,
            "mx": -0.461
        }
        at_sensor.update_data(th_dict)
        th_dict = {
            "sensor": 'AT',
            "average_value": -60.007,
            "sample_count": 200938,
            "minimum_value": -100.386,
            "maximum_value": -0.461
        }
        at_sensor_dict_updated = {
            "sensor": at_sensor.sensor,
            "average_value": at_sensor.average_value,
            "sample_count": at_sensor.sample_count,
            "minimum_value": at_sensor.minimum_value,
            "maximum_value": at_sensor.maximum_value
        }
        for key, item in at_sensor_dict_updated.items():
            self.assertEqual(th_dict[key], item, "checking equality for key:" + str(key))  # checking Key Equality
            self.assertNotEqual(at_sensor_dict_orig, item, "checking inequality for key:" + str(key))
        at_sensor.update_data({
            "sensor": 'AT',
            "average_value": -54.007,
            "sample_count": 140938,
            "minimum_value": -94.386,
            "maximum_value": -5.461
        })

    def test_str(self):
        """
        Testing conversion to str
        """
        sector_0 = self.sensors_dict.get('AT', None)
        self.assertNotEqual(sector_0, None)  # Check if Sector Exist
        at_sensor_str = str(sector_0)
        at_sensor_str_th = "Sensor: " + "AT" + " on Sol Day:" + str(492) + ",min: " + str(-94.39) + ",avg: " + str(
            -54.01) + ",max: " + str(-5.46)
        self.assertEqual(at_sensor_str, at_sensor_str_th, 'testing to string for AT Sensor')

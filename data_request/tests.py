from django.test import TestCase

from WeatherInSight import settings
from .models import WindSector, WindDirection, SolDayData

from .utils import check_sol_valid

import json


# Create your tests here.
class WindSectorModelTest(TestCase):
    def setUpClass(cls):
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
            self.assertEqual(th_dict[key], item, "checking equality for key:" + str(key)) # checking Key Equality

    def test_wind_sector_update(self):
        """
        Cheacking
        """

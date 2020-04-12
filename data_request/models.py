from django.db import models
import numpy as np
from datetime import datetime


class SolDayData(models.Model):
    sol_date = models.IntegerField(default=0)
    first_utc = models.DateTimeField('First UTC')
    last_utc = models.DateTimeField('Last UTC')
    season = models.CharField(max_length=20)
    validated = models.IntegerField(default=0)

    @classmethod
    def create(cls, sol_date: str, data: dict, valid: bool):
        first_utc = datetime.strptime(data.get('First_UTC') + "+0000", "%Y-%m-%dT%H:%M:%SZ%z")
        last_utc = datetime.strptime(data.get('Last_UTC') + "+0000", "%Y-%m-%dT%H:%M:%SZ%z")
        season = str(data.get("Season"))
        validated = 1 if valid else 0
        sol_day = cls(sol_date=sol_date, first_utc=first_utc, last_utc=last_utc, season=season,
                      validated=validated)
        sol_day.save()
        at_sensor = SensorData.create(sol_day, "AT", data.get("AT"))
        at_sensor.save()

        hws_sensor = SensorData.create(sol_day, "HWS", data.get("HWS"))
        hws_sensor.save()

        pre_sensor = SensorData.create(sol_day, "PRE", data.get("PRE"))
        pre_sensor.save()

        wd_sensor = WindDirection.create(sol_day, data.get("WD"))
        wd_sensor.save()

        return sol_day

    def update_data(self, data: dict, valid: bool):
        self.first_utc = datetime.strptime(data.get('First_UTC') + "+0000", "%Y-%m-%dT%H:%M:%SZ%z")
        self.last_utc = datetime.strptime(data.get('Last_UTC') + "+0000", "%Y-%m-%dT%H:%M:%SZ%z")
        self.season = str(data.get("Season"))
        self.validated = 1 if valid else 0
        self.sensordata_set.get(sensor="AT").update_data(data.get("AT"))
        self.sensordata_set.get(sensor="HWS").update_data(data.get("HWS"))
        self.sensordata_set.get(sensor="PRE").update_data(data.get("PRE"))
        self.winddirection_set.get(sol_day=self.sol_date).update_data(data.get("WD"))
        self.save()

    def is_validated(self):
        return self.validated > 0

    def __str__(self):
        return "Data from Sol Day:" + str(self.sol_date)


class WindDirection(models.Model):
    sol_day = models.ForeignKey(SolDayData, on_delete=models.CASCADE)

    @classmethod
    def create(cls, sol_day: SolDayData, data: dict):
        wind_direction = cls(sol_day=sol_day)
        wind_direction.save()
        for key, value in data.items():
            wind_sector = WindSector.create(key, wind_direction, value)
            wind_sector.save()
        return wind_direction

    def update_data(self, data: dict):
        for key, item in data.items():
            if key == "most_common":
                sector = -1
            else:
                sector = int(key)
            wind_sector = self.objects.windsector_set.get(sector=sector)
            wind_sector.update_data(item)
            wind_sector.save()
            self.save()

    def __str__(self):
        return "Wind Directions on Sol Day: " + str(self.sol_day.sol_date)


class WindSector(models.Model):
    wind_directions = models.ForeignKey(WindDirection, on_delete=models.CASCADE)
    sector = models.IntegerField(default=0)
    compass_degrees = models.FloatField(default=0.0)
    compass_point = models.CharField(max_length=3)
    compass_right = models.FloatField(default=0.0)
    compass_up = models.FloatField(default=0.0)
    ct = models.FloatField(default=0.0)

    @classmethod
    def create(cls, sector_str: str, wind_directions: WindDirection, data: dict):
        if sector_str == "most_common":
            sector = -1
        else:
            sector = int(sector_str)
        compass_degree = float(data.get("compass_degrees"))
        compass_point = str(data.get("compass_point"))
        compass_right = float(data.get("compass_right"))
        compass_up = float(data.get("compass_up"))
        ct = float(data.get("ct"))

        wind_sector = cls(sector=sector, wind_directions=wind_directions, compass_degrees=compass_degree,
                          compass_point=compass_point, compass_right=compass_right, compass_up=compass_up,
                          ct=ct)
        return wind_sector

    def update_data(self, data: dict):
        self.compass_degree = float(data.get("compass_degrees"))
        self.compass_point = str(data.get("compass_point"))
        self.compass_right = float(data.get("compass_right"))
        self.compass_up = float(data.get("compass_up"))
        self.ct = float(data.get("ct"))
        self.save()

    def __str__(self):
        if self.sector == -1:
            return "MOST COMMON Direction " + self.compass_point + ", ct:" + str(self.ct)
        return self.compass_point + ", ct:" + str(self.ct)


class SensorData(models.Model):
    sol_day = models.ForeignKey(SolDayData, on_delete=models.CASCADE)
    sensor = models.CharField(max_length=3)
    average_value = models.FloatField(default=0.0)
    sample_count = models.FloatField(default=0.0)
    minimum_value = models.FloatField(default=0.0)
    maximum_value = models.FloatField(default=0.0)

    @classmethod
    def create(cls, sol_day: SolDayData, sensor: str, data: dict):
        if sensor == 'AT':
            av = np.round((float(data.get('av')) - 32) * (5 / 9), 3)
            mn = np.round((float(data.get('mn')) - 32) * (5 / 9), 3)
            mx = np.round((float(data.get('mx')) - 32) * (5 / 9), 3)
        else:
            av = np.round(float(data.get('av')), 3)
            mn = np.round(float(data.get('mn')), 3)
            mx = np.round(float(data.get('mx')), 3)
        sample_count = float(data.get('ct'))
        ct = float(data.get('ct'))
        sensor_data = cls(sol_day=sol_day, sensor=sensor, average_value=av, minimum_value=mn, maximum_value=mx,
                          sample_count=ct)
        return sensor_data

    def update_data(self, data: dict):
        if self.sensor == 'AT':
            self.av = np.round((float(data.get('av')) - 32) * (5 / 9), 3)
            self.mn = np.round((float(data.get('mn')) - 32) * (5 / 9), 3)
            self.mx = np.round((float(data.get('mx')) - 32) * (5 / 9), 3)
        else:
            self.av = np.round(float(data.get('av')), 3)
            self.mn = np.round(float(data.get('mn')), 3)
            self.mx = np.round(float(data.get('mx')), 3)
        self.sample_count = float(data.get('ct'))
        self.save()

    def __str__(self):
        return "Sensor: " + self.sensor + " on Sol Day:" + str(self.sol_day.sol_date) + ",min: " + str(
            np.round(self.minimum_value, 2)) + ",avg: " + str(np.round(self.average_value, 2)) + ",max: " + str(
            np.round(self.maximum_value, 2))

from email.policy import default
from django.db import models

from datetime import datetime


class Sol(models.Model):
    sol_number = models.IntegerField(default=0)
    season = models.CharField(max_length=20)
    sol_start_utc = models.DateTimeField('Sol Start UTC')
    sol_end_utc = models.DateTimeField('Sol End UTC')
    is_valid = models.IntegerField(default=0)

    @classmethod
    def create(cls, sol_json: dict):
        sol = cls(sol_number=sol_json["sol_date"], season=sol_json["season"], sol_start_utc=sol_json["First_UTC"], sol_end_utc=sol_json["Last_UTC"], is_valid=1 if sol_json["valid"] else 0)
        sol.save()
        sensor_list = []
        for sensor_type, sensor_values in sol_json["sensors"].items():
            sensor = Sensor.create(sol, sensor_type, sensor_values["mn"], sensor_values["mx"], sensor_values["av"], int(sensor_values['ct']))
            sensor.save()
            sensor_list.append(sensor)

        sector_list = []
        for wind_sector, sector_data in sol_json["winds"].items():
            if wind_sector != "most_common" and wind_sector != 'cnt':
                sector = WindSector.create(sol, int(wind_sector), sector_data["compass_degrees"], sector_data["compass_right"], sector_data["compass_up"], sector_data["compass_point"], int(sector_data["ct"]))
                sector.save()
                sector_list.append(sector)

        most_common_deg = sol_json["winds"]["most_common"]["compass_degrees"]
        for sector in sector_list:
            if sector.compass_degrees == most_common_deg:
                sector.is_most_common = 1
                sector.save()
                break
        return sol

    def export(self):
        export_dict = {
            "sol_date": self.sol_number,
            "season": self.season,
            "First_UTC": self.sol_start_utc,
            "Last_UTC": self.sol_end_utc,
            "valid": self.is_valid == 1,
            "sensors": {},
            "winds": {}
        }

        sensors = Sensor.objects.filter(sol__exact=self)
        for sensor in sensors:
            sensor_type, data_dict = sensor.export()
            export_dict["sensors"][sensor_type] = data_dict

        wind_sectors = WindSector.objects.filter(sol__exact=self)
        for wind_sector in wind_sectors:
            sector, data_dict, is_most_common = wind_sector.export()
            export_dict["winds"][str(sector)] = data_dict
            if is_most_common:
                export_dict["winds"]["most_common"] = data_dict

        return self.sol_number, export_dict

    def __str__(self) -> str:
        return "Sol {}".format(self.sol_number)


class Sensor(models.Model):
    sol = models.ForeignKey(Sol, on_delete=models.CASCADE, default=None)
    sensor_type = models.CharField(max_length=5)
    average = models.FloatField(default=0.0)
    minimum = models.FloatField(default=0.0)
    maximum = models.FloatField(default=0.0)
    sample_count = models.IntegerField(default=0)

    @classmethod
    def create(cls, sol: Sol, sensor_type: str, mn: float, mx: float, av: float, ct: int):
        sensor = cls(sol=sol, sensor_type=sensor_type, average=av, minimum=mn, maximum=mx, sample_count=ct)
        return sensor

    def export(self):
        export_dict = {
            "av": self.average,
            "mn": self.minimum,
            "mx": self.maximum,
            "ct": self.sample_count
        }
        return (self.sensor_type, export_dict)

    def __str__(self) -> str:
        return "Sensor: {} on Sol {}".format(self.sensor_type, self.sol.sol_number)


class WindSector(models.Model):
    sol = models.ForeignKey(Sol, on_delete=models.CASCADE, default=None)
    sector = models.IntegerField(default=0)
    is_most_common = models.IntegerField(default=0)
    compass_degrees = models.FloatField(default=0.0)
    compass_right = models.FloatField(default=0.0)
    compass_up = models.FloatField(default=0.0)
    compass_point = models.CharField(max_length=4)
    sample_count = models.IntegerField(default=0)

    @classmethod
    def create(cls, sol: Sol, sector: int, c_deg: float, c_right: float, c_up: float, c_point: str, ct: int):
        wind_sector = cls(sol=sol, sector=sector, compass_degrees=c_deg, compass_right=c_right, compass_up=c_up, compass_point=c_point, sample_count=ct)
        return wind_sector

    def export(self):
        export_dict = {
            "compass_degrees": self.compass_degrees,
            "compass_point": self.compass_point,
            "compass_right": self.compass_right,
            "compass_up": self.compass_up,
            "ct": self.sample_count
        }
        return (self.sector, export_dict, self.is_most_common == 1)

    def __str__(self) -> str:
        mc = bool(self.is_most_common == 1)
        return "Wind Sector {} on Sol {}{}".format(self.compass_point, self.sol.sol_number, " Most Common" if mc else "")

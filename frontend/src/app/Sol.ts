export interface SolList{
    [sol_id: number]: Sol;
}

export interface Sol {
    sol_date: Number;
    season: string;
    First_UTC: string | Date;
    Last_UTC: string | Date;
    valid: boolean;
    sensors: {[sensor_type: string]: Sensor};
    winds: WindSectorList;
}

export interface SensorList {
    [sensor_type: string]: Sensor;
}

export interface Sensor {
    av: number;
    mn: number;
    mx: number;
    ct: number;
}

export interface WindSectorList{
    [sector_name: string] : WindSector;
}

export interface WindSector {
    compass_degrees: number;
    compass_point: string;
    compass_right: number;
    compass_up: number;
    ct: number;
}

export interface SectorChartData{
    direction: number;
    frequency: number;
}
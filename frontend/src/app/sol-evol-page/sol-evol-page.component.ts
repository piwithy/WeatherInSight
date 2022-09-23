import { Component, OnInit, ViewChild } from '@angular/core';
import { Sol } from '../Sol';
import { SolService } from '../sol.service';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ChartComponent,
  ApexPlotOptions,
  ApexStroke,
  ApexTheme,
  ApexLegend,
  ApexYAxis,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  theme: ApexTheme;
  legend: ApexLegend;
};

@Component({
  selector: 'app-sol-evol-page',
  templateUrl: './sol-evol-page.component.html',
  styleUrls: ['./sol-evol-page.component.css']
})
export class SolEvolPageComponent implements OnInit {

  @ViewChild("tempChart") tempChart?: ChartComponent;
  public tempChartOptions?: Partial<ChartOptions>;

  @ViewChild("pressureChart") pressureChart?: ChartComponent;
  public pressureChartOptions?: Partial<ChartOptions>;

  @ViewChild("windSpeedChart") windSpeedChart?: ChartComponent;
  public windSpeedChartOptions?: Partial<ChartOptions>;

  @ViewChild("windDirectionChart") windDirectionChart?: ChartComponent;
  public windDirectionChartOptions?: Partial<ChartOptions>;

  firstSol?: Sol;
  lastSol?: Sol;

  public generalChartOptions: Partial<ChartOptions> = {
      chart: {
        type: "line",
        zoom: {
          enabled: false
        }
      },
      stroke:{
        curve: 'smooth'
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "top",
        labels: {
          colors: "#ffffff"
        }
      }
  };

  solList: Sol[] = [];

  constructor(private solService: SolService) { }

  ngOnInit(): void {
    this.get_sols()
  }

  private get_sols(): void{
    this.solService.getLastSols(0).subscribe(sols => {
        for(const sol of Object.values(sols)){
          this.solList.push(sol);
        }
        this.solList.sort((a, b) => {
          return a.sol_date < b.sol_date ? -1 : 1; 
        });
        this.firstSol = this.solList[0];
        this.lastSol  = this.solList[this.solList.length -1];
        let temp_data = {
          min: [this.solList[0].sensors["AT"].mn],
          avg: [this.solList[0].sensors["AT"].av],
          max: [this.solList[0].sensors["AT"].mx]
        };
        let pressure_data = {
          min: [this.solList[0].sensors["PRE"].mn],
          avg: [this.solList[0].sensors["PRE"].av],
          max: [this.solList[0].sensors["PRE"].mx]
        };
        let wind_speed_data = {
          min: [this.solList[0].sensors["HWS"].mn],
          avg: [this.solList[0].sensors["HWS"].av],
          max: [this.solList[0].sensors["HWS"].mx]
        };
        let wind_direction_data = [this.solList[0].winds["most_common"].compass_degrees];
        
        let x_axis_labels = [this.solList[0].sol_date];

        for(const sol of this.solList.slice(1)){
          temp_data.min.push(sol.sensors["AT"].mn);
          temp_data.avg.push(sol.sensors["AT"].av);
          temp_data.max.push(sol.sensors["AT"].mx);
          
          pressure_data.min.push(sol.sensors["PRE"].mn);
          pressure_data.avg.push(sol.sensors["PRE"].av);
          pressure_data.max.push(sol.sensors["PRE"].mx);

          wind_speed_data.min.push(sol.sensors["HWS"].mn);
          wind_speed_data.avg.push(sol.sensors["HWS"].av);
          wind_speed_data.max.push(sol.sensors["HWS"].mx);

          wind_direction_data.push(sol.winds["most_common"].compass_degrees);

          x_axis_labels.push(sol.sol_date);
        }

        this.generalChartOptions.xaxis = {
          categories: x_axis_labels,
          title: {
            text: "Sols",
            style: {
              color: "white"
            }
          },
          labels: {
            style:{
              colors: "#ffffff"
            }
          }
        }

        this.tempChartOptions = {
          series: [
            {
              name: "Maximum Tempature (°C)",
              data: temp_data.max,
              color: '#0b3d78'
            },
            {
              name: "Average Temperature (°C)",
              data: temp_data.avg,
              color: '#cc321a'
            },
            {
              name: "Minimum Tempature (°C)",
              data: temp_data.min,
              color: '#0b3d78'
            },
          ],
          yaxis: {
            title:{
              text: "Temperature (°C)",
              style:{
                color: "white"
              }
            },
            labels: {
              style: {
                colors: '#ffffff'
              }
            }
          }
        }

        this.pressureChartOptions = {
          series: [
            {
              name: "Maximum Pressure (Pa)",
              data: pressure_data.max,
              color: '#0b3d78'
            },
            {
              name: "Average Pressure (Pa)",
              data: pressure_data.avg,
              color: '#cc321a'
            },
            {
              name: "Minimum Pressure (Pa)",
              data: pressure_data.min,
              color: '#0b3d78'
            },
          ],
          yaxis: {
            title:{
              text: "Atmospheric Pressure (Pa)",
              style:{
                color:"white"
              }
            },
            labels: {
              style: {
                colors: '#ffffff'
              }
            }
          }
        }

        this.windSpeedChartOptions = {
          series: [
            {
              name: "Maximum Wind Speed (m/s)",
              data: wind_speed_data.max,
              color: '#0b3d78'
            },
            {
              name: "Average Wind Speed (m/s)",
              data: wind_speed_data.avg,
              color: '#cc321a'
            },
            {
              name: "Minimum Wind Speed (m/s)",
              data: wind_speed_data.min,
              color: '#0b3d78'
            },
          ],
          yaxis: {
            title:{
              text: "Wind Speed (m/s)",
              style:{
                color: "white"
              }
            },
            labels: {
              style: {
                colors: '#ffffff'
              }
            }
          }
        }

        this.windDirectionChartOptions = {
          series:[
            {
              name: "Most Common Wind Direction (°)",
              data: wind_direction_data,
              color: '#cc321a'
            }
          ],
          yaxis: {
            title:{
              text: "Wind Direction (°)",
              style: {
                color: 'white'
              }
            },
            labels: {
              style: {
                colors: '#ffffff'
              }
            }
          }
        }

    });
  }

}

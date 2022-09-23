import { Component, OnInit, ViewChild } from '@angular/core';

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

import { Sol } from '../Sol';
import { SolService } from '../sol.service';

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
  selector: 'app-sol-home-page',
  templateUrl: './sol-home-page.component.html',
  styleUrls: ['./sol-home-page.component.css']
})
export class SolHomePageComponent implements OnInit {

  last6sols?: Sol[];

  @ViewChild("wind_rose_chart") wind_rose_chart?: ChartComponent;
  public windRoseChartOptions?: Partial<ChartOptions>;
  
  @ViewChild("temp_chart") temp_chart?: ChartComponent;
  public tempChartOptions?: Partial<ChartOptions>;

  constructor(private solService: SolService) { }

  ngOnInit(): void {
    this.getSols();
  }

  getSols(): void{
    this.solService.getLastSols(7).subscribe(sols => {
      this.last6sols = [];
      for(const sol of Object.values(sols)){
        sol.First_UTC = new Date(sol.First_UTC);
        sol.Last_UTC = new Date(sol.Last_UTC);
        this.last6sols.push(sol);
      }
      this.last6sols.sort((a, b) => {
        return a.sol_date > b.sol_date ? -1 : 1;
      })

      let wind_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      let wind_axis = ["N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A"]
      let sum_ct = 0;
      
       
      for(const sector of Object.values(this.last6sols[0].winds)){
        wind_data[Math.floor(sector.compass_degrees / 22.5)] = sector.ct;
        if (sector.compass_point != wind_axis[Math.floor(sector.compass_degrees / 22.5)]){
          wind_axis[Math.floor(sector.compass_degrees / 22.5)] = sector.compass_point;
          sum_ct += sector.ct;
        }
      }
      for(let i=0; i<wind_data.length; i++){
        wind_data[i] = Math.round((wind_data[i] / sum_ct) * 10000) / 100;
      }
      let temp_data = []
      let temp_axis = []
      for(const sol of this.last6sols){
        temp_data.push(sol.sensors["AT"].av);
        temp_axis.push("Sol " + sol.sol_date);
      }

      this.tempChartOptions = {
        series: [
          {
            name: "Average Temperature (°C)",
            data: temp_data
          }
        ],
        chart: {
          type: "line",
          height: "300px",
          zoom: {
            enabled: false
          }
        },
        xaxis: {
          categories: temp_axis,
          labels: {
            style:{
              colors: "#ffffff"
            }
          }
        },
        yaxis: {
          labels:{
            style:{
              colors: '#ffffff'
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        theme:{
          monochrome: {
            enabled: true,
            color: '#cc321a',
            shadeTo: 'light',
            shadeIntensity: 0.65
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'top',
          labels:{
            colors: "#ffffff"
          }
        },
      }

      this.windRoseChartOptions = {
        series: [
          {
            name: "Wind Provenance %",
            data: wind_data
          }
        ],
        chart: {
          type: "radar",
          height: "540px",
          zoom: {
            enabled: false
          }
        },
        xaxis: {
          categories: wind_axis,
          labels: {
            style:{
              colors: "#ffffff"
            }
          }
        },
        yaxis: {
          labels:{
            style:{
              colors: '#ffffff'
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        theme:{
          monochrome: {
            enabled: true,
            color: '#cc321a',
            shadeTo: 'light',
            shadeIntensity: 0.65
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'top',
          labels:{
            colors: "#ffffff"
          }
        },
      }
    })
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

import { SectorChartData, Sol, WindSector } from '../Sol';
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
  selector: 'app-sol-wind-rose',
  templateUrl: './sol-wind-rose.component.html',
  styleUrls: ['./sol-wind-rose.component.css'],
})

export class SolWindRoseComponent implements OnInit {

  @ViewChild("chart") chart?: ChartComponent;
  public windRoseChartOptions?: Partial<ChartOptions>;

  constructor(private solService: SolService, private route: ActivatedRoute) {
  }

  solData?: Sol;


  ngOnInit(): void {
    this.getSol()
  }

  getSol(){
    const sol_id = Number(this.route.snapshot.paramMap.get("id"));
    this.solService.getUnique(sol_id).subscribe((sol =>{
      this.solData = sol[sol_id];

      let wind_data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      let wind_axis = ["N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A"]
      let sum_ct = 0;
      for(const sector of Object.values(this.solData.winds)){
        wind_data[Math.floor(sector.compass_degrees / 22.5)] = sector.ct;
        if (sector.compass_point != wind_axis[Math.floor(sector.compass_degrees / 22.5)]){
          wind_axis[Math.floor(sector.compass_degrees / 22.5)] = sector.compass_point;
          sum_ct += sector.ct;
        }
      }
      for(let i=0; i<wind_data.length; i++){
        wind_data[i] = Math.round((wind_data[i] / sum_ct) * 10000) / 100;
      }

      this.windRoseChartOptions = {
        series: [
          {
            name: "Wind Provenance (%)",
            data: wind_data
          }
        ],
        chart: {
          type: "radar",
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

    }));
  }

}

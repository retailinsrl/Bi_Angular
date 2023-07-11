import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-highcharts',
  template: '<div id="chartContainer"></div>',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    Highcharts.chart('chartContainer', {
      title: {
        text: 'Passive Income through years'
      },
      series: [{
        type:'line' ,
        data: [1, 3, 2, 4,6,5,4,3,2,1,4,6,7,8,8,5]
      }]
    });
    
  }
}


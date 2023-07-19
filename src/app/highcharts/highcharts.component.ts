import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-highcharts',
  template: '<div id="chartContainer"></div>',
  styleUrls: ['./highcharts.component.scss'],
  providers: [ApiService] // Include ApiService in providers

})
export class HighchartsComponent implements AfterViewInit, OnDestroy {
  constructor(private apiService: ApiService) {}
  private subscription: Subscription | undefined;   // 
  ngAfterViewInit(): void {
    const forecastIncome = '';
    const currentIncome = '';
  
    const data = {
      currentIncome: currentIncome,
      forecastIncome: forecastIncome,
    }; // Provide the necessary data for the API call
  
    this.apiService.getIncomePrediction(data).subscribe({
      next: ({ forecastIncome, currentIncome }) => {
        const incomeTimestamp = Array.isArray(forecastIncome.incomeTimestamp) ? forecastIncome.incomeTimestamp : [];
        const incomeIncasso = forecastIncome.incomeIncasso;
        const realTimestamp = Array.isArray(currentIncome.realTimestamp) ? currentIncome.realTimestamp : [];
        const realIncasso = currentIncome.realIncasso;
  
        const mergedData = this.mergeData(incomeTimestamp, incomeIncasso, realTimestamp, realIncasso);
        const arrayTimestamp = mergedData.arrayTimestamp;
        const arrayIncasso = mergedData.arrayIncasso;
        const arrayForecast = mergedData.arrayForecast;
  
        this.incomeChart(arrayTimestamp, arrayIncasso, arrayForecast);
      },
      error: (error) => {
        console.error('An error occurred while fetching income data:', error);
        // Handle the error appropriately (e.g., display an error message)
      },
      // complete: () => {
      //   // Optionally handle the completion if needed
      // }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  mergeData(
    incomeTimestamp: number[],
    incomeIncasso: (number | null)[],
    realTimestamp: number[],
    realIncasso: (number | null)[]
  ): { arrayTimestamp: number[]; arrayIncasso: number[]; arrayForecast: number[] } {
    const objIncasso: Map<number, (number | null)[]> = new Map();
    const objPredict: Map<number, (number | null)[]> = new Map();

    let allTimestamp: number[] = [...incomeTimestamp, ...realTimestamp];
    allTimestamp = [...new Set(allTimestamp)];

    allTimestamp.sort();

    for (let i = 0; i < realTimestamp.length; i++) {
      objIncasso.set(realTimestamp[i], [realIncasso[i]]);
    }
    for (let i = 0; i < incomeTimestamp.length; i++) {
      objPredict.set(incomeTimestamp[i], [incomeIncasso[i]]);
    }

    // Iterate over a Map's keys - predict
    for (const key of allTimestamp) {
      const found = incomeTimestamp.find((element) => element === key);

      if (found === undefined || found === null) {
        objPredict.set(key, [null]);
      } else {
        const index = incomeTimestamp.findIndex((element) => element === key);
        objPredict.set(key, [incomeIncasso[index]]);
      }
    }

    // Iterate over a Map's keys - real
    for (const key of allTimestamp) {
      const found = realTimestamp.find((element) => element === key);

      if (found === undefined || found === null) {
        objIncasso.set(key, [null]);
      } else {
        const index = realTimestamp.findIndex((element) => element === key);
        objIncasso.set(key, [realIncasso[index]]);
      }
    }

    const arrayTimestamp: number[] = [];
    const arrayIncasso: number[] = [];
    const arrayForecast: number[] = [];
    for (const key of allTimestamp) {
      arrayTimestamp.push(key);
      arrayIncasso.push(objIncasso.get(key)?.[0] ?? NaN);
      arrayForecast.push(objPredict.get(key)?.[0] ?? NaN);
    }

    return {
      arrayTimestamp: arrayTimestamp,
      arrayIncasso: arrayIncasso,
      arrayForecast: arrayForecast
    };
    
  }
  

  incomeChart(arrayTimestamp: number[], arrayIncasso: number[], arrayForecast: number[]): void {
    const arrayS: number[] = arrayIncasso.concat(arrayForecast);
    const maxVal: number = Math.max(...arrayS.filter((value) => !isNaN(value)));
   
    const options: Highcharts.Options = {
      chart: {
        type: 'line',
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      xAxis: [
        {
          categories: arrayTimestamp.map(String), // Convert to string array
          crosshair: true,
        },
      ],
      yAxis: {
        startOnTick: true,
        min: 0,
        max: maxVal,
        tickInterval: 25000,
      },
      series: [
        {
          name: 'Incasso',
          type: 'line', // Specify series type
          data: arrayIncasso,
        },
        {
          name: 'Incasso Forecast',
          type: 'line', // Specify series type
          data: arrayForecast,
        },
      ],
    };

    Highcharts.chart('chartContainer', options);
  }
}







// import { Component, AfterViewInit } from '@angular/core';
// import * as Highcharts from 'highcharts';

// @Component({
//   selector: 'app-highcharts',
//   template: '<div id="chartContainer"></div>',
//   styleUrls: ['./highcharts.component.scss']
// })
// export class HighchartsComponent implements AfterViewInit {
//   ngAfterViewInit(): void {
//     Highcharts.chart('chartContainer', {
      
//       title: {
//         text: 'Passive Income through years'
//       },
//       series: [{
//         type:'line' ,
//         data: [1, 3, 2, 4,6,5,4,3,2,1,4,6,7,8,8,5]
//       }]
      
//     });
    
//   }
// }


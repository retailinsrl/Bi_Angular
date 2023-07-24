import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,  map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class ApiService {
  private apiUrl = 'https://apiml.retailin.it:3000';  // API URL

  constructor(private http: HttpClient) { }

  //GET request example
  public getData(selectedShopId: string) {
    const url = `${this.apiUrl}/employee-shifts?selectedShopId=${encodeURIComponent(selectedShopId)}`;
    return this.http.get(url);
  }


  
  public getIncomePrediction(data: any): Observable<any> {
    // First, make the "getForecastIncome" request and process its response
    const forecastIncome$ = this.http.post<any>(`${this.apiUrl}/getForecastIncome`, data, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        body: JSON.stringify(data)
      })
    }).pipe(
      catchError((error) => {
        console.error('An error occurred while fetching forecast income:', error);
        return ('Failed to fetch forecast income.');
      })
    );
  
    // Then, proceed to make the "cash-register" request and process its response
    const currentIncome$ = this.http.post<any>(`${this.apiUrl}/cash-register`, data, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        body: JSON.stringify(data)

      })
    }).pipe(
      catchError((error) => {
        console.error('An error occurred while fetching current income:', error);
        return ('Failed to fetch current income.');
      })
    );
  
    // Use switchMap to combine both responses
    return forecastIncome$.pipe(
      switchMap((forecastIncome) => currentIncome$.pipe(
        map((currentIncome) => ({ forecastIncome, currentIncome }))
      ))
    );
  }
  
//   public async getData(selectedShopId: string): Promise<any> {
//     const url = `${this.apiUrl}/employee-shifts?selectedShopId=${encodeURIComponent(selectedShopId)}`;
//     const res_employee_shifts = await this.http.get(url).toPromise();
//     const res_json_employee_shifts = res_employee_shifts as any;
//     console.log("res_json_employee_shifts: ");
//     console.log(res_json_employee_shifts);
//     return res_json_employee_shifts;
//   }
// }
  
  
  // POST request example
  // public async getIncomePrediction(data: any): Promise<any> {
  //   try {
  //     // Get forecast income
  //     const responseIncome = await this.http.post<any>(
  //       `${this.apiUrl}/getForecastIncome`,
  //       data,
  //       {
  //         headers: new HttpHeaders({
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         })
  //       }
  //     ).toPromise();

  //     if (responseIncome) {
  //       // Process response
  //       const forecastIncome = responseIncome;

  //       // Get current income
  //       const responseCurrentIncome = await this.http.post<any>(
  //         `${this.apiUrl}/cash-register`,
  //         data,
  //         {
  //           headers: new HttpHeaders({
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json'
  //           })
  //         }
  //       ).toPromise();

  //       if (responseCurrentIncome) {
  //         // Process response
  //         const currentIncome = responseCurrentIncome;

  //         // Return the results
  //         return {
  //           forecastIncome,
  //           currentIncome
  //         };
  //       } else {
  //         // Handle error when responseCurrentIncome is undefined
  //         throw new Error('Failed to fetch current income.');
  //       }
  //     } else {
  //       // Handle error when responseIncome is undefined
  //       throw new Error('Failed to fetch forecast income.');
  //     }
  //   } catch (error) {
  //     // Handle other errors
  //     console.error('An error occurred while fetching income data:', error);
  //     throw error;
  //   }
  // }





//   public async getIncomePrediction(data: any): Promise<any> {
//     try {
//       // Get forecast income
//       const responseIncome = await this.http.post<any>(`${this.apiUrl}/getForecastIncome`, data, {
//         headers: new HttpHeaders({
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         })
//       }).toPromise();

//       if (responseIncome) {
//         // Process response
//         const forecastIncome = responseIncome;

//         // Get current income
//         const responseCurrentIncome = await this.http.post<any>(`${this.apiUrl}/cash-register`, data, {
//           headers: new HttpHeaders({
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//           })
//         }).toPromise();

//         if (responseCurrentIncome) {
//           // Process response
//           const currentIncome = responseCurrentIncome;

//           // Return the results
//           return {
//             forecastIncome,
//             currentIncome
//           };
//         } else {
//           // Handle error when responseCurrentIncome is undefined
//           throw new Error('Failed to fetch current income.');
//         }
//       } else {
//         // Handle error when responseIncome is undefined
//         throw new Error('Failed to fetch forecast income.');
//       }
//     } catch (error) {
//       // Handle other errors
//       console.error('An error occurred while fetching income data:', error);
//       throw error;
//     }
//   }
// }



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable()
// export class ApiService {
//   private apiUrl = 'https://apiml.retailin.it:3000';  // Api Url

//   constructor(private http: HttpClient) { }

//   // GET request example
//   public getData(selectedShopId: string) {
//     const url = `${this.apiUrl}/employee-shifts?selectedShopId=${encodeURIComponent(selectedShopId)}`;
//         return this.http.get(url);
//   }
// }







//   // POST request example
//   public createData(data: any) {
//     const url = `${this.apiUrl}/data`;
//     return this.http.post(url, data);
//   }

//   // PUT request example
//   public updateData(id: number, data: any) {
//     const url = `${this.apiUrl}/data/${id}`;
//     return this.http.put(url, data);
//   }

//   // DELETE request example
//   public deleteData(id: number) {
//     const url = `${this.apiUrl}/data/${id}`;
//     return this.http.delete(url);
//   }
}

//  import { Component, OnInit } from '@angular/core';
//  import { ApiService } from '../api.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {

//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     // Call the getData method from the ApiService
//     const selectedShopId = 'selectedShop'; // Replace with the desired selectedShopId
//     try {
//       this.apiService.getData(selectedShopId).subscribe(
//         (data: any) => {
//           // Handle the data received from the API
//           console.log(data); // You can do further processing or display the data in the frontend
//         },
//         (error: any) => {
//           // Handle errors if any
//           console.error(error);
//         }
//       );
//     } catch (error:any ) {
//       // Handle any specific error that occurred during the API call
//       console.error('An error occurred.');
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public responseData: any; // Variable to store the received data

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const selectedShopId = 'your-selected-shop-id'; // Replace with the desired selectedShopId
    this.apiService.getData(selectedShopId).subscribe(
      (data: any) => {
        // Handle the data received from the API
        this.responseData = data;
        console.log(this.responseData); // Log the data to the console
      },
      (error: any) => {
        // Handle errors if any
        console.error(error);
      }
    );
  }
}

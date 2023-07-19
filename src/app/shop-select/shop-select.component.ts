  import { Component } from '@angular/core';
  import { ApiService } from '../api.service';
  import { Subscription } from 'rxjs';

  @Component({
    selector: 'app-shop-select',
    templateUrl: './shop-select.component.html',
    styleUrls: ['./shop-select.component.scss']
  })
  export class ShopSelectComponent {
    selectedShopId: string = '';
    responseData: any;
    private subscription: Subscription | undefined;   // 

    constructor(private apiService: ApiService) {}

    onShopSelect() {
      if (!this.selectedShopId) return;
  
      this.subscription = this.apiService.getData(this.selectedShopId).subscribe(
        (data) => {
          this.responseData = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    sendDataForm() {
      const selectedShop = (<HTMLInputElement>document.getElementById("shopSelection")).value;
      const elements = (<HTMLFormElement>document.getElementById("myForm")).elements;
      const jsonInput: { [key: string]: string } = {}; // Define the type of jsonInput
    
      for (let i = 0; i < elements.length; i++) {
        const item = elements[i];
        if (item instanceof HTMLInputElement || item instanceof HTMLSelectElement) {
          if (item.name) {
            jsonInput[item.name] = item.value;
          }
        }
      }
    
      console.log(jsonInput);
    
      const data = {
        selectedShop: selectedShop,
        jsonInput: jsonInput
      };
    
      console.log("data: ", data);
    }
    

    changeShop() {
      const selectedShop = (<HTMLInputElement>document.getElementById("shopSelection")).value;
      let selectedShopId: number | null = null;
      switch (selectedShop) {
        case 'biscollai':
          selectedShopId = 53;
          break;
        case 'olbiabasa':
          selectedShopId = 49;
          break;
        case 'marinedda':
          selectedShopId = 131;
          break;
        default:
          console.log(`Sorry, we are out of ${selectedShop}.`);
      }
      console.log(selectedShopId);
      const data = {
        selectedShop: selectedShop,
        selectedShopId: selectedShopId
      };
      console.log("data: ", data);
    }
  }


// @Component({
//   selector: 'app-shop-select',
//   templateUrl: './shop-select.component.html',
//   styleUrls: ['./shop-select.component.scss']
// })
// export class ShopSelectComponent {
// selectedShopId: string = '';
// responseData: any;

//   constructor(private apiService: ApiService) {}

//   onShopSelect() {
//     this.apiService.getData(this.selectedShopId).subscribe(
//       (data) => {
//         this.responseData = data;
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
// }


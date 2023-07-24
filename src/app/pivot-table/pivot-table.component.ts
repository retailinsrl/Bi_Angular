import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

interface EmployeeShift {
  department_name: string;
  data: string;
  hours_amount: number;
}

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss']
})
export class PivotTableComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() { 
 
    const selectedShopId = '131';
let selectedShop: string = ''; // Provide a default value

switch (parseInt(selectedShopId, 10)) {
  case 53:
    selectedShop = 'biscollai';
    break;
  case 49:
    selectedShop = 'olbiabasa';
    break;
  case 131:
    selectedShop = 'marinedda';
    break;
  default:
    console.log(`Sorry, we are out of the shop with ID ${selectedShopId}.`);
}

if (selectedShop) {
  console.log(`The selected shop is ${selectedShop} with ID ${selectedShopId}.`);
} else {
  console.log(`Failed to find a shop with ID ${selectedShopId}.`);
}


    
    
    
    
    
    // Replace with the actual value
    this.apiService.getData(selectedShopId).subscribe(
      (res: any) => {
        try {
          if (Array.isArray(res.data)) { // Access the 'data' key to get the actual array
            const res_json_employee_shifts: EmployeeShift[] = res.data as EmployeeShift[];
            console.log('res_json_employee_shifts:');
            console.log(res_json_employee_shifts);

            const pivot_table = this.getPivotArray(res_json_employee_shifts, 5, 0, 6);
            this.arrayToHTMLTable(pivot_table);
          } else {
            console.error('Data is not an array:', res.data);
          }
        } catch (error) {
          console.error('Error while processing data:', error);
        }
      },
      (error: any) => {
        console.error('Failed to fetch employee shifts:', error);
      }
    );
  }

  getPivotArray(dataArray: EmployeeShift[], _rowIndex: number, _colIndex: number, _dataIndex: number) {
    const result: { [key: string]: { [key: string]: number } } = {};
    const ret = [];
    const newCols: string[] = [];
    for (const data of dataArray) {
      if (!result[data.department_name]) {
        result[data.department_name] = {};
      }
      result[data.department_name][data.data] = data.hours_amount;

      // To get column names
      if (newCols.indexOf(data.data) === -1) {
        newCols.push(data.data);
      }
    }

    let item = [];

    // Add Header Row
    item.push('Reparto');
    item.push(...newCols);
    item.push('Total');
    ret.push(item);

    // Add content
    for (const key in result) {
      item = [];
      item.push(key);
      let total = 0;
      for (const newCol of newCols) {
        item.push(result[key][newCol] || '-');
        total += result[key][newCol] || 0;
      }
      item.push(total);
      ret.push(item);
    }

    return ret;
  }

  arrayToHTMLTable(myArray: any[]) {
    let result = "<table border='0' cellpadding='7' cellspacing='0' bgcolor='#F1F1F1' >";
    for (let i = 0; i < myArray.length; i++) {
      result += "<tr>";
      for (let j = 0; j < myArray[i].length; j++) {
        if (i === 0) {
          result += "<th>" + myArray[i][j] + "</th>";
        } else {
          result += "<td>" + myArray[i][j] + "</td>";
        }
      }
      result += "</tr>";
    }
    const div = document.getElementById('container_table');
    if (div !== null) {
      div.innerHTML = result;
    }
  }
}






// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';
// import { Subscription } from 'rxjs';
// import { ShopSelectionService } from '../shop-selection-service.service';

// interface EmployeeShift {
//   department_name: string;
//   data: string;
//   hours_amount: number;
// }

// @Component({
//   selector: 'app-pivot-table',
//   templateUrl: './pivot-table.component.html',
//   styleUrls: ['./pivot-table.component.scss']
// })
// export class PivotTableComponent implements OnInit {
//   // selectedShopId: string = '49'; // Default shop ID
//   pivotTableData: any[][] = []; // Add pivotTableData property to hold the data
//   constructor(
//     private apiService: ApiService,
//     private shopSelectionService: ShopSelectionService // Inject the service
//   ) {}

//   ngOnInit() {
//     // Subscribe to changes in the selected shop ID
//     this.shopSelectionService.selectedShopId$.subscribe((selectedShopId) => {
//       this.fetchData(selectedShopId); // Call fetchData whenever the shop ID changes
//     });
//   }

//   fetchData(selectedShopId: string) {
//     if (!selectedShopId) return; // Return early if the shop ID is not available

//     this.apiService.getData(selectedShopId).subscribe(
//       (res: any) => {
//         try {
//           if (Array.isArray(res.data)) {
//             const res_json_employee_shifts: EmployeeShift[] = res.data as EmployeeShift[];
//             console.log('res_json_employee_shifts:');
//             console.log(res_json_employee_shifts);

//             this.pivotTableData = this.getPivotArray(res_json_employee_shifts, 5, 0, 6);
//             this.arrayToHTMLTable(this.pivotTableData);
//           } else {
//             console.error('Data is not an array:', res.data);
//           }
//         } catch (error) {
//           console.error('Error while processing data:', error);
//         }
//       },
//       (error: any) => {
//         console.error('Failed to fetch employee shifts:', error);
//       }
//     );
//   }

//   getPivotArray(dataArray: EmployeeShift[], _rowIndex: number, _colIndex: number, _dataIndex: number) {
//     const result: { [key: string]: { [key: string]: number } } = {};
//     const ret = [];
//     const newCols: string[] = [];
//     for (const data of dataArray) {
//       if (!result[data.department_name]) {
//         result[data.department_name] = {};
//       }
//       result[data.department_name][data.data] = data.hours_amount;

//       // To get column names
//       if (newCols.indexOf(data.data) === -1) {
//         newCols.push(data.data);
//       }
//     }

//     let item = [];

//     // Add Header Row
//     item.push('Reparto');
//     item.push(...newCols);
//     item.push('Total');
//     ret.push(item);

//     // Add content
//     for (const key in result) {
//       item = [];
//       item.push(key);
//       let total = 0;
//       for (const newCol of newCols) {
//         item.push(result[key][newCol] || '-');
//         total += result[key][newCol] || 0;
//       }
//       item.push(total);
//       ret.push(item);
//     }

//     return ret;
//   }

//   arrayToHTMLTable(myArray: any[]) {
//     let result = "<table border='0' cellpadding='7' cellspacing='0' bgcolor='#F1F1F1' >";
//     for (let i = 0; i < myArray.length; i++) {
//       result += "<tr>";
//       for (let j = 0; j < myArray[i].length; j++) {
//         if (i === 0) {
//           result += "<th>" + myArray[i][j] + "</th>";
//         } else {
//           result += "<td>" + myArray[i][j] + "</td>";
//         }
//       }
//       result += "</tr>";
//     }
//     const div = document.getElementById('container_table');
//     if (div !== null) {
//       div.innerHTML = result;
//     }
//   }
// }

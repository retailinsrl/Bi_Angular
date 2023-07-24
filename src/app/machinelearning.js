//import Chart from 'https://code.highcharts.com/es-modules/Core/Chart/Chart.js';
//import LineSeries from 'https://code.highcharts.com/es-modules/Series/Line/LineSeries.js';


import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';

export function sendDataForm() {
    var selectedShop = document.getElementById("shopSelection").value;


    var elements = document.getElementById("myForm").elements;
    var jsonInput ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        jsonInput[item.name] = item.value;
    }
    console.log(jsonInput);
    //document.getElementById("demo").innerHTML = JSON.stringify(obj);
    const data = {
        selectedShop: selectedShop,
        jsonInput: jsonInput
    };

    async function execWhatIfScript() {
        let responseIncome = await fetch("https://apiml.retailin.it:3000/whatif", {
                                           method: 'post',
                                           headers: {
                                               'Accept': 'application/json',
                                               'Content-Type': 'application/json'
                                           },
                                           body: JSON.stringify(data)
                                           });
        let responseJson = await responseIncome.json();

        let whatIfTimestamp = [];
        let whatIfIncasso = [];
        for(let j = 0; j < responseJson.length; j++) {
            let objectJson = responseJson[j]['timestamp,incasso'];
            console.log(objectJson);
            let arrayObject = objectJson.split(',');
            whatIfTimestamp.push(arrayObject[0]);
            whatIfIncasso.push(parseInt(arrayObject[1]))
        }

        incomeWhatIfChart(whatIfTimestamp, whatIfIncasso);
    }

    execWhatIfScript();
}

$(document).ready(function() {
  console.log("Page is fully loaded");
  changeShop(); // Call the changeShop function when the page is fully loaded

 });

export function changeShop() {
    var selectedShop = document.getElementById("shopSelection").value;
    var selectedShopId = null;   
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
        console.log(`Sorry, we are out of ${expr}.`);
        }
    console.log(selectedShopId);
    const data = {
            selectedShop: selectedShop,
            selectedShopId: selectedShopId
    };
console.log("data: "+data);


    async function getIncomePrediction() {
        // legge il nostro JSON per il forecast
        let responseIncome = await fetch("https://apiml.retailin.it:3000/getForecastIncome", {
                                           method: 'post',
                                           headers: {
                                               'Accept': 'application/json',
                                               'Content-Type': 'application/json'
                                           },
                                           body: JSON.stringify(data)
                                           });
        let responseJson = await responseIncome.json();

        // legge il nostro JSON degli incassi
        let responseCurrentIncome = await fetch("https://apiml.retailin.it:3000/cash-register", {
                                             method: 'post',
                                             headers: {
                                                 'Accept': 'application/json',
                                                 'Content-Type': 'application/json'
                                             },
                                             body: JSON.stringify(data)
                                             });

        // get employee shifrs
        let res_employee_shifts = await fetch(`https://apiml.retailin.it:3000/employee-shifts?selectedShopId=${encodeURIComponent(data.selectedShopId)}`, {
                                             method: 'get',
                                             headers: {
                                                 'Accept': 'application/json',
                                                 'Content-Type': 'application/json'
                                             }
                                             });
         let res_json_employee_shifts = {};
        res_json_employee_shifts = await res_employee_shifts.json();
        console.log("res_json_employee_shifts: ")
        console.log(res_json_employee_shifts)

      

        let responseJsonIncome = await responseCurrentIncome.json();

        let incomeTimestamp = [];
        let incomeIncasso = [];
        for(let j = 0; j < responseJson.length; j++) {
            let objectJson = responseJson[j]['timestamp,incasso'];
            //console.log(objectJson);
            let arrayObject = objectJson.split(',');
            incomeTimestamp.push(arrayObject[0]);
            incomeIncasso.push(parseInt(arrayObject[1]))

        }
        console.log("income: ")
        console.log(incomeTimestamp);
        console.log(incomeIncasso);

        let realTimestamp = [];
        let realIncasso = [];
        for(let j = 0; j < responseJsonIncome.data.length; j++) {
            realTimestamp.push(responseJsonIncome.data[j].tempo);
            realIncasso.push(responseJsonIncome.data[j].incasso);
        }
        console.log("real: ")
        console.log(realTimestamp);
        console.log(realIncasso);


//prepareEmployeeShiftsData(res_json_employee_shifts.data);
        let pivot_table = getPivotArray(res_json_employee_shifts.data, 5, 0, 6);
        arrayToHTMLTable(pivot_table);


        mergeData(incomeTimestamp, incomeIncasso, realTimestamp, realIncasso);
    }
    getIncomePrediction();
}


function getPivotArray(dataArray, rowIndex, colIndex, dataIndex) {
    var result = {}, ret = [];
    var newCols = [];
    for (var i = 0; i < dataArray.length; i++) {

        if (!result[dataArray[i].department_name]) {
            result[dataArray[i].department_name] = {};
        }
        result[dataArray[i].department_name][dataArray[i].data] = dataArray[i].hours_amount;

        //To get column names
        if (newCols.indexOf(dataArray[i].data) == -1) {
            newCols.push(dataArray[i].data);
        }
    }

    //newCols.sort();
    var item = [];

    //Add Header Row
    item.push('Reparto');
    item.push.apply(item, newCols);
    item.push('Total'); // Add the 'Total' column header
    ret.push(item);

    //Add content
    for (var key in result) {
        item = [];
        item.push(key);
	var total = 0; // Initialize the total sum for the row
        for (var i = 0; i < newCols.length; i++) {
            item.push(result[key][newCols[i]] || "-");
            total += result[key][newCols[i]] || 0; // Calculate the total sum for the row
        }
        item.push(total); // Add the total sum to the row
        ret.push(item);
    }

    console.log(ret);

    return ret;
}



function arrayToHTMLTable(myArray) {
   let result = "<table border='0' cellpadding='7' cellspacing='0' bgcolor='#F1F1F1' >";
   for (var i = 0; i < myArray.length; i++) {
       result += "<tr>";
       for (var j = 0; j < myArray[i].length; j++) {
          if (i === 0) {
            result += "<th>" + myArray[i][j] + "</th>"; // Use <th> for header cells
        } else {
            result += "<td>" + myArray[i][j] + "</td>";
        }


       }


       result += "</tr>";
   }

   result += "</table>";
   document.getElementById('container_table').innerHTML = '';
   let div = document.getElementById("container_table");

   div.innerHTML = result;
}

function prepareEmployeeShiftsData(data) {
    // Step 1. Extract the unique country_id, category Ids and years
    const giorni = Array(...new Set(data.map((x) => x.data)));
    const department_name = Array(...new Set(data.map((x) => x.department_name)));

    // Step 2. Convert the source data into an object so that you can conveniently read off particular rows, in terms of COUNTRY_ID and CATEGORY
    const sourceRows = {};
    data.forEach((row) => {
      if (!sourceRows[row.giorni]) {
        sourceRows[row.giorni] = {};
      }
      sourceRows[row.giorni][row.department_name] = row;
    });

    // You can visualise the output here with this, if you want:
    console.log(sourceRows)

    // Step 3. Create destination array, and poke a row into it for each country & year.
    const destination = [];
    country_ids.forEach((giorni) => {
      years.forEach((year) => {
        const sourceRow = sourceRows[country_id][categories[0]];
        const destRow = {
          giorni: giorni,
          name: sourceRow.name,
          country: sourceRow.country,
          year: year,
          a: sourceRows[country_id]["A"][year], // Rotation
          b: sourceRows[country_id]["B"][year], // Rotation
          c: sourceRows[country_id]["C"][year]  // Rotation
        };
        destination.push(destRow);
      });
    });

    console.log(destination);
}

function populateTable(table, rows, cells, content) {
    var is_func = (typeof content === 'function');
    if (!table) table = document.createElement('table');
    for (var i = 0; i < rows; ++i) {
        var row = document.createElement('tr');
        for (var j = 0; j < cells; ++j) {
            row.appendChild(document.createElement('td'));
            var text = !is_func ? (content + '') : content(table, i, j);
            row.cells[j].appendChild(document.createTextNode(text));
        }
        table.appendChild(row);
    }
    return table;
}





function mergeData(incomeTimestamp, incomeIncasso, realTimestamp, realIncasso) {
    var objIncasso = new Map();
    var objPredict = new Map();

    let allTimestamp = incomeTimestamp.concat(realTimestamp);
    allTimestamp = [...new Set([...incomeTimestamp,...realTimestamp])]

    console.log(allTimestamp);

	allTimestamp.sort();

    for(let i = 0; i < realTimestamp.length; i++) {
        objIncasso.set(realTimestamp[i],[ realIncasso[i] ]);
    }
    for(let i = 0; i < incomeTimestamp.length; i++) {
        objPredict.set(incomeTimestamp[i],[ incomeIncasso[i] ]);
    }

    // Iterate over a Map's keys - predict
    for (const key of allTimestamp) {
        //console.log(key);
        const found = incomeTimestamp.find(element => element == key);

        if (found === undefined || found === null) {
            //console.log('non trovato');
            objPredict.set(key,[null]);
        } else {
            //console.log('trovato');
            const finderIndex = (element) => element == key;
            let index = incomeTimestamp.findIndex(finderIndex);

            objPredict.set(key,[incomeIncasso[index]]);
        }
    }

    // Iterate over a Map's keys - real
    for (const key of allTimestamp) {
        //console.log(key);
        const found = realTimestamp.find(element => element == key);

        if (found === undefined || found === null) {
            //console.log('non trovato');
            objIncasso.set(key,[null]);
        } else {
            //console.log('trovato');
            const finderIndex = (element) => element == key;
            let index = realTimestamp.findIndex(finderIndex);

            objIncasso.set(key,[realIncasso[index]]);
        }
    }

    let arrayTimestamp = [];
    let arrayIncasso = [];
    let arrayForecast = [];
    for (const key of allTimestamp) {
        arrayTimestamp.push(key);
        arrayIncasso.push( objIncasso.get(key)[0] );
        arrayForecast.push( objPredict.get(key)[0] );
    }

    incomeChart(arrayTimestamp, arrayIncasso, arrayForecast);
}

function incomeChart(arrayTimestamp, arrayIncasso, arrayForecast) {


    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };
    let arrayS = arrayIncasso.concat(arrayForecast);
    console.log(arrayS.max());

	Highcharts.chart('incomeContainer', {    

        chart: {
                zoomType: 'xy'
            },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: [{
                categories:
                    arrayTimestamp
                        ,
                crosshair: true
            }],
        yAxis: {
            startOnTick: true,
            min: 0,
            max: arrayS.max(),
            tickInterval: 25000
        },

        series: [{
            name: 'Incasso',
            data: arrayIncasso
        }, {
           name: 'Incasso Forecast',
           data: arrayForecast
        }
        ]
    });

}

function incomeWhatIfChart(whatIfTimestamp, whatIfIncasso) {

    new Chart('whatIfContainer', {
        chart: {
                zoomType: 'xy'
            },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: [{
                categories:
                    whatIfTimestamp
                        ,
                crosshair: true
            }],
        yAxis: {
            startOnTick: true,
            min: 0,
            max: 225000,
            tickInterval: 25000
        },

        series: [{
            name: 'Incasso',
            data: whatIfIncasso
        }
        ]
    });

}




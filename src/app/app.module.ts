import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HighchartsComponent } from './highcharts/highcharts.component';
import { TableComponent } from './table/table.component';
import { MachinelearningComponent } from './machinelearning/machinelearning.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { QuickviewComponent } from './quickview/quickview.component';
import { AnalysisComponent } from './analysis/analysis.component';
 import { ShopSelectComponent } from './shop-select/shop-select.component';
import {ApiService} from './api.service';
import { ShopSelectionService } from './shop-selection-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SelectProvaaComponent } from './select-provaa/select-provaa.component';
import { PivotTableComponent } from './pivot-table/pivot-table.component';
import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    HighchartsComponent,
    TableComponent,
    MachinelearningComponent,
    ComparisonComponent,
    QuickviewComponent,
    AnalysisComponent,
     ShopSelectComponent,
     SelectProvaaComponent,
     PivotTableComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //material imports
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    DataTablesModule,
    
  ],
  providers: [ApiService,ShopSelectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }




//import { QdtComponentsComponent } from './qdt-components/qdt-components.component';
//QdtComponentsComponent,
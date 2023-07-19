import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { QuickviewComponent } from './quickview/quickview.component';


import { MachinelearningComponent } from './machinelearning/machinelearning.component';
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'machinelearning' , component:MachinelearningComponent},
  {path: 'comparison' , component:ComparisonComponent},
  {path: 'quickview' , component:QuickviewComponent},

  {path: 'analysis' , component:AnalysisComponent},
  {path: 'dashboard', component:DashboardComponent},];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

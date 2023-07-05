import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppSideNavComponent } from './app-side-nav/app-side-nav.component';
import { AppMainComponent } from './app-main/app-main.component';
// import { QdtComponent } from './qdt/qdt.component';



@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSideNavComponent,
    AppMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




//import { QdtComponentsComponent } from './qdt-components/qdt-components.component';
//QdtComponentsComponent,
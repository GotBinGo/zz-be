import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SensorComponent } from './sensor/sensor.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { LaptopComponent } from './laptop/laptop.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SensorComponent,
    LaptopComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import 'rxjs/Rx';
import { LandingComponent } from './landing/landing.component';
import { BarChartComponent } from './charts/bar-chart.component';
import { RoboService } from './services/robo.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule
  ],
  providers: [
    RoboService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

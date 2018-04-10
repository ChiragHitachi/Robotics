import { Component, OnInit } from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import { IRobo } from '../models/robo.model';
import { RoboService } from '../services/robo.service';
import { IBarChart } from '../models/bar-chart.model';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  title = '';
  robos: IRobo[];
  selectedRobo: IRobo;
  chartData: IBarChart;
  distance: number;

  constructor(private roboService: RoboService) {

  }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.roboService.getRobos().subscribe((result) => { this.robos = result.data; });
  }

  public calculate() {
      console.log(this.selectedRobo, this.distance);
  }
}

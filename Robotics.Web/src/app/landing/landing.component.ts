import { Component, OnInit } from '@angular/core';
import { IRobo } from '../models/robo.model';
import { RoboService } from '../services/robo.service';
import { IBarChart } from '../models/bar-chart.model';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  title = '';
  robos: IRobo[] = [];
  selectedRobo: IRobo;
  chartData: IBarChart;
  distance: number;

  constructor(private roboService: RoboService) {
    this.chartData = {
        title: 'Robo Movement',
        xAxisCategories:['Robo1', 'Robo2', 'Robo3'],
        xAxisTitle: 'Robos',
        yAxisTitle: 'Distance',
        series: [{name: 'red', data: [45, 277, 108], color: 'Red'},
        {name: 'green', data: [145, 577, 608], color: 'green'}]
    }
  }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.roboService.getRobos().subscribe((result) => { this.robos = result.data;console.log(this.robos); });
  }

  public calculate() {
      console.log(this.selectedRobo, this.distance);
  }
}

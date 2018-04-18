import {
  Component,
  OnInit
}

from '@angular/core';
import {
  IRobo,
  ISeries,
  IDistance,
  IDisplayDistance
}

from '../models/robo.model';
import {
  RoboService
}

from '../services/robo.service';
import {
  IBarChart
}

from '../models/bar-chart.model';
import {
  direction,
  color
}

from '../models/enums';
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
  }

) export class LandingComponent implements OnInit {
  title = '';
  robos: IRobo[] = [{
    color: null,
    direction: null,
    name: '--select--'
  }];
  selectedRobo: IRobo;
  chartData: IBarChart;
  distanceX: number;
  distanceY: number;
  totalDistance: IDisplayDistance[];
  constructor(private roboService: RoboService) {}
  ngOnInit() {
    this.getData();
  }
  private getData() {
    // dynamic creation of chart. minimum changes required when new color is added.
    this.roboService.getRobos().subscribe((result) => {
      result.data.forEach((r) => {
        this.robos.push(r);
      });

      let categories: string[] = [];
      let series: ISeries[] = [];
      let dataArr: number[] = [];
      const values = Object.keys(color)
      .filter(k => typeof color[k] === 'number') as string[];;
      let dirValues = Object.keys(direction)
      .filter(k => typeof direction[k] === 'number') as string[];

      dirValues.forEach((value) => {
        categories.push(value);
        dataArr.push(0);
      });

      values.forEach((value) => {
        const temp = Object.assign([], dataArr);
        series.push({
            name: value,
            data: temp,
            color: value
          });
      });

      this.chartData = {
        title: 'Robo Movement',
        xAxisCategories: categories,
        xAxisTitle: 'Robos',
        yAxisTitle: 'Distance',
        series: series
      };
    });
  }

  public calculate() {
    if (this.selectedRobo && this.selectedRobo.direction) {
        let dist: IDistance = {x: this.distanceX, y: this.distanceY};
      this.roboService.calculateMovement(this.selectedRobo,  dist).subscribe((movement) => {
        if (movement) {
          let temp = Object.assign({}, this.chartData);
          this.chartData = null;
          if (movement.robo.direction === direction.angular) {
            this.ValueforColor(0, temp, movement.movement, color[movement.robo.color]);
          } else {
            this.ValueforColor(1, temp, movement.movement, color[movement.robo.color]);
          }
          this.chartData = temp;
          this.totalDistance = this.roboService.getTotalDistance();
        }
      });
    }
  }

  private ValueforColor(current: number, temp: IBarChart, movement: number, col: string) {
    const values = Object.keys(color)
    .filter(k => typeof color[k] === 'number') as string[];
    let i: number = 0;

    values.forEach((v) => {
      if (v === col){
        temp.series[i].data[current] = movement;
      }
      i++;
    });
  }
}

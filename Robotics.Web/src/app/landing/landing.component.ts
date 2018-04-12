import {
  Component,
  OnInit
}

from '@angular/core';
import {
  IRobo,
  ISeries,
  IDistance
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
  totalDistance: number;
  constructor(private roboService: RoboService) {}
  ngOnInit() {
    this.getData();
  }
  private getData() {
    this.roboService.getRobos().subscribe((result) => {
      result.data.forEach((r) => {
        this.robos.push(r);
      });

      let categories: string[] = [];
      let series: ISeries[] = [];
      let dataArr: number[] = [];
      let values = Object.keys(color)
      .filter(k => typeof color[k] === "number") as string[];;
      let dirValues = Object.keys(direction)
      .filter(k => typeof direction[k] === "number") as string[];

      dirValues.forEach((value) => {
        categories.push(value);
        dataArr.push(0);
      });

      values.forEach((value) => {
        series.push({
            name: value,
            data: [0, 0],
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
        let dist :IDistance = {x: this.distanceX, y: this.distanceY};
      this.roboService.calculateMovement(this.selectedRobo,  dist).subscribe((movement) => {
        if (movement) {
          let temp = Object.assign({}, this.chartData);
          this.chartData = null;
          if (movement.robo.direction === direction.angular) {
            if (movement.robo.color === color.red) {
              temp.series[0].data[0] = movement.movement;
            } else {
              temp.series[1].data[0] = movement.movement;
            }
          } else {
            if (movement.robo.color === color.red) {
              temp.series[0].data[1] = movement.movement;
            } else {
              temp.series[1].data[1] = movement.movement;
            }
          }
          this.chartData = temp;
          this.totalDistance = this.roboService.getTotalDistance();
        }
         
      });
    }
  }
}

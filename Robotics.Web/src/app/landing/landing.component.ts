import {
  Component,
  OnInit
} from '@angular/core';
import {
  IRobo
} from '../models/robo.model';
import {
  RoboService
} from '../services/robo.service';
import {
  IBarChart
} from '../models/bar-chart.model';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  title = '';
  robos: IRobo[] = [];
  selectedRobo: IRobo;
  chartData: IBarChart;
  distanceX: number;
  distanceY: number;

  constructor(private roboService: RoboService) {
    this.chartData = {
      title: 'Robo Movement',
      xAxisCategories: ['Angular', 'React'],
      xAxisTitle: 'Robos',
      yAxisTitle: 'Distance',
      series: [{
          name: 'red',
          data: [0, 0],
          color: 'Red'
        },
        {
          name: 'green',
          data: [0, 0],
          color: 'green'
        }
      ]
    }
  }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.roboService.getRobos().subscribe((result) => {
      this.robos = result.data;
    });
  }

  public calculate() {
    this.roboService.calculateMovement(this.selectedRobo, {
      x: this.distanceX,
      y: this.distanceY
    }).subscribe((movement) => {
      if (movement.robo.direction === 'angular') {
        if (movement.robo.color === 'red') {
          this.chartData.series[0].data[0] = movement.movement;
        } else {
          this.chartData.series[1].data[0] = movement.movement;
        }
      } else {
        if (movement.robo.color === 'red') {
          this.chartData.series[0].data[1] = movement.movement;
        } else {
          this.chartData.series[1].data[1] = movement.movement;
        }
      }

      console.log(this.chartData);
    });
  }
}

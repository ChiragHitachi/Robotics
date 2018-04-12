import {
  Injectable
} from '@angular/core';
import {
  IRobo,
  IMovement,
  IRoboMovement,
  IDistance
} from '../models/robo.model';
import {
  Observable
} from 'rxjs/Observable';
import {
  IResponse
} from '../models/common.models';
import {
  responseStatus,
  color,
  direction
} from '../models/enums';
import {
  IBarChart
} from '../models/bar-chart.model';

@Injectable()
export class RoboService {
  getRobos: () => Observable < IResponse < IRobo[] >> ;
  calculateMovement: (robo: IRobo, distance: IDistance) => Observable < IMovement > ;
  getTotalDistance : () => number;
  private moveHistory: IRoboMovement[] = [];

  constructor() {
    const vm = this;
    vm.getTotalDistance = () =>{
      let total: number = 0;
      if(this.moveHistory){
        this.moveHistory.forEach((value) => {
          total += value.total;
        });
      }
      return total;
    };

    vm.calculateMovement = (robo: IRobo, distance: IDistance) => {
      let movement: IMovement;
      if (robo && distance) {
        movement = {
          robo: robo,
          movement: this.calculation(distance, robo.direction)
        };
        let r = this.moveHistory.find((data) => data.robo.name === robo.name);
        if (r) {
          r.total = movement.movement;
          movement.movement = r.total;
        } else {
          this.moveHistory.push({
            robo: robo,
            movement: [{
              x: distance.x,
              y: distance.y
            }],
            total: movement.movement
          });
        }
      }
      return Observable.of(movement);
    };

    vm.getRobos = () => {
      const robos: IRobo[] = [{
          name: 'angular-red',
          color: color.red,
          direction: direction.angular
        },
        {
          name: 'angular-green',
          color: color.green,
          direction: direction.angular

        },
        {
          name: 'react-red',
          color: color.red,
          direction: direction.linear
        },
        {
          name: 'react-green',
          color: color.green,
          direction: direction.linear

        }
      ];

      const data: IResponse < IRobo[] > = {
        data: robos,
        status: responseStatus.Success
      };

      return Observable.of(data);
    };
  }
  private calculation(distance: IDistance, target: direction) {
      let result : number = 0;
    if (target === direction.linear) {
      result = Math.abs(Math.sqrt(Math.pow(distance.x - distance.x, 2) + Math.pow(distance.y - distance.y, 2)));

    } else {
      const radius = Math.abs(Math.sqrt(Math.pow(distance.x - distance.x, 2) + Math.pow(distance.y - distance.y, 2)));
       result = (2 * Math.PI * radius) + radius;
    }
    return result;
  }
}

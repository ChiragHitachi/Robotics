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
  private moveHistory: IRoboMovement[] = [];

  constructor() {
    const vm = this;

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
      result = distance.x + distance.y;
    } else {
      result = (distance.x + distance.y) * 2;
    }
    return result;
  }
}

import {
  Injectable
} from '@angular/core';
import {
  IRobo,
  IMovement,
  IRoboMovement,
  IDistance,
  IDisplayDistance
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
  getTotalDistance : () => IDisplayDistance[] ;
  private moveHistory: IRoboMovement[] = [];

  constructor() {
    const vm = this;

    vm.getTotalDistance = () =>{
      let total: number = 0;
      let displayVals : IDisplayDistance[] = [];

      if(this.moveHistory){
        this.moveHistory.forEach((value) => {
          let r: IDisplayDistance = displayVals.find((data) => data.option === color[value.robo.color]);
          if (r) {
            r.distance += value.total;
          }
          else{
            displayVals.push({option:color[value.robo.color], distance : value.total});
          }
          let d: IDisplayDistance = displayVals.find((data) => data.option === direction[value.robo.direction]);
          if (d) {
            d.distance += value.total;
          }
          else{
            displayVals.push({option:direction[value.robo.direction], distance : value.total});
          }
          total += value.total;

        });
      }
      displayVals.push({option:"all", distance : total});
      
      return displayVals;
    };

    vm.calculateMovement = (robo: IRobo, distance: IDistance) => {
      let movement: IMovement;
      if (robo && distance) {
        let r = this.moveHistory.find((data) => data.robo.name === robo.name);
        
        let from :IDistance = {x:0, y:0};

        if(r && r.movement && r.movement.length > 0){
          const last :IDistance = r.movement[r.movement.length -1];
          from.x = last.x;
          from.y = last.y;
        }
        movement = {
          robo: robo,
          movement: this.calculation(distance, robo.direction, from )
        };
        if (r) {
          r.total += movement.movement;
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

    // add any new color and the application should still work with minimum changes
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
  private calculation(distance: IDistance, target: direction,  from: IDistance) {
      let result : number = 0;
    if (target === direction.linear) {
      result = Math.abs(Math.sqrt(Math.pow(distance.x - from.x, 2) + Math.pow(distance.y - from.y, 2)));

    } else {
      const radius = Math.abs(Math.sqrt(Math.pow(distance.x - from.x, 2) + Math.pow(distance.y - from.y, 2)));
       result = (2 * Math.PI * radius) + radius;
    }
    alert(result);
    return result;
  }
}

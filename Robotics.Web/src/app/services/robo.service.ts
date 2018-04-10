import {
  Injectable
} from '@angular/core';
import {
  IRobo, IMovement, IRoboMovement, IDistance
} from '../models/robo.model';
import {
  Observable
} from 'rxjs/Observable';
import {
  IResponse
} from '../models/common.models';
import {
  responseStatus
} from '../models/enums';
import { IBarChart } from '../models/bar-chart.model';

@Injectable()
export class RoboService {
  getRobos: () => Observable < IResponse < IRobo[] >> ;
  calculateMovement: (robo: IRobo, distance: IDistance) => Observable <IMovement>;
  private moveHistory: IRoboMovement[] = [];

  constructor() {
    const vm = this;

    vm.calculateMovement = (robo: IRobo, distance: IDistance) => {
        let movement: IMovement = {robo: robo, movement: 0};
        if (robo.direction === 'linear'){
            movement.movement = distance.x + distance.y;
        } else
        {
            movement.movement = (distance.x + distance.y) * 2;
        }
        let r = this.moveHistory.find((data) => data.robo.name === robo.name);
        if (r){
            if (robo.direction === 'linear'){
            r.movement.forEach((data) => {
                movement.movement += (data.x + data.y);
            });
        }
        else{
            r.movement.forEach((data) => {
                movement.movement += ((data.x + data.y) * 2);
            });
        }
            r.movement.push(distance);
        }
        else{
            this.moveHistory.push({robo: robo, movement: [{x: distance.x, y: distance.y}]});
        }
      
        return Observable.of(movement);
    };

    vm.getRobos = () => {
      const robos: IRobo[] = [{
          name: 'angular-red',
          color: 'red',
          direction: 'angular'
        },
        {
          name: 'angular-green',
          color: 'green',
          direction: 'angular'

        },
        {
          name: 'react-red',
          color: 'red',
          direction: 'linear'
        },
        {
          name: 'react-green',
          color: 'green',
          direction: 'linear'

        }
      ];

      const data: IResponse < IRobo[] > = {
        data: robos,
        status: responseStatus.Success
      };

      return Observable.of(data);
    };
  }
}

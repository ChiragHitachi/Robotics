import {
  Injectable
} from '@angular/core';
import {
  IRobo
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

@Injectable()
export class RoboService {
  getRobos: () => Observable < IResponse < IRobo[] >> ;

  constructor() {
    const vm = this;

    vm.getRobos = () => {
      const robos: IRobo[] = [{
          name: 'robo1',
          color: 'red'
        },
        {
          name: 'robo2',
          color: 'green'
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

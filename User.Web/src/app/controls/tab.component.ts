import { Input, Component } from '@angular/core';
import { TabsComponent } from './tabs.component';

@Component({
    selector: 'app-tab',
    template: `
      <div [hidden]="!active">
        <ng-content></ng-content>
      </div>
    `
  })
  export class TabComponent {
    @Input()
    tabTitle: string;
    active:boolean;

    constructor(tabs:TabsComponent) {
      tabs.addTab(this);
    }
  }
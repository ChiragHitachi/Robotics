import { Component } from "@angular/core";
import { TabComponent } from "./tab.component";

@Component({
    selector: 'app-tabs',
    template: `
      <ul class="nav nav-tabs">
        <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
          {{tab.tabTitle}}
        </li>
      </ul>
      <ng-content></ng-content>
    `,
  })

  export class TabsComponent {
    tabs:TabComponent[] = [];

    selectTab(tab: TabComponent) {
      this.tabs.forEach((t) => {
        t.active = false;
      });
      tab.active = true;
    }

    addTab(tab: TabComponent) {
      if (this.tabs.length === 0) {
        tab.active = true;
      }
      this.tabs.push(tab);
    }
  }
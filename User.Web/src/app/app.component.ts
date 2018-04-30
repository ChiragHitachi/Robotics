import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})

export class AppComponent implements OnInit {
    totalEstimate:number;
    ctx:any;
    dynamicTemplate:any;
    @ViewChild('estimateTemplate1') estimateTemplate1: any;
    @ViewChild('estimateTemplate2') estimateTemplate2: any;

    public constructor() {}
    public ngOnInit(): void {
        this.totalEstimate = 10;
        this.ctx = {estimate: this.totalEstimate};
        this.dynamicTemplate = this.estimateTemplate2;
    }
}

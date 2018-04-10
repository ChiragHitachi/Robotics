import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  IBarChart
} from '../models/bar-chart.model';
import { chart } from 'highcharts';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements OnChanges {
  public title: string;
  @Input() chartData: IBarChart;
  @ViewChild('chartTarget') chartTarget: ElementRef;
  private chart: Highcharts.ChartObject;

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['chartData'];
    if (change && change.currentValue && change.currentValue !== change.previousValue) {
      this.drawChart(change.currentValue);
    }
  }

  private drawChart(data: IBarChart) {
    const options: Highcharts.Options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: data.title
      },
      xAxis: {
        categories: data.xAxisCategories
      },
      yAxis: {
        title: {
          text: data.yAxisTitle
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },

      series:  data.series
    };
    this.chart = chart(this.chartTarget.nativeElement, options);
  }
}

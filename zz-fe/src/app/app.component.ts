import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'zz-fe';
 
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'CPU' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private dataSevice: DataService) {}

  ngOnInit() {
    this.dataSevice.getData().subscribe(x => {
      let dd = x.map(x => x.measure.avgCpuPercent)
      this.lineChartData[0].data = dd
      this.lineChartLabels = dd.map((x, i) => i);
    });
  }
}

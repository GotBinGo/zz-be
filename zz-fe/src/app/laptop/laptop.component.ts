import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
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

  constructor(private dataSevice: DataService) { }

  ngOnInit(): void {
    this.dataSevice.getData().subscribe(x => {
      let dd = x.map(x => x.measure.avgCpuPercent)
      this.lineChartData[0].data = dd
      this.lineChartLabels = dd.map((x, i) => i);
    });
  }

}

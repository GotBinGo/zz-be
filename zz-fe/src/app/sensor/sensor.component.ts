import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  sensorModel = [
    new SensorTableModel("sensor1", 24, new Date(), true, 320, 550, 'rgb(255,99,132)'),
    new SensorTableModel("sensor2", 24.5, new Date(), true, 360, 575, 'rgb(54,162,235)'),
    new SensorTableModel("sensor3", 23.5, new Date(), true, 410, 560, 'rgb(255,206,86)'),
    new SensorTableModel("sensor4", 22, new Date(), true, 420, 510, 'rgb(231,233,237)'),
    new SensorTableModel("sensor5", 23.2, new Date(), true, 430, 450, 'rgb(75,192,192)')
  ];

  lineChartData: ChartDataSets[] = [
    { label: "sensor1", fill: false, data: [5, 6, 7, 8, 10, 10, 12, 12.5, 13, 10, 7, 5], hidden: false },
    { label: "sensor2", fill: false, data: [6, 7, 8, 9, 10, 10, 12, 12.5, 13, 10, 7, 5], hidden: false },
    { label: "sensor3", fill: false, data: [7, 8, 9, 10, 10, 10, 12, 12.5, 13, 10, 7, 5], hidden: false },
    { label: "sensor4", fill: false, data: [8, 9, 10, 11, 10, 10, 12, 12.5, 13, 10, 7, 5], hidden: false },
    { label: "sensor5", fill: false, data: [9, 10, 11, 12, 10, 10, 12, 12.5, 13, 10, 7, 5], hidden: false },
  ];

  lineChartLabels: Label[] = [
    "0h", "2h", "4h", "6h", "8h", "10h", "12h", "14h", "16h", "18h", "20h", "22h"
  ];

  lineChartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontSize: 14,
      },
      padding: 20,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 2,
            suggestedMin: 0,
            suggestedMax: 20,
            padding: 10,
            fontSize: 14,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            padding: 10,
            fontSize: 14,
          },
        },
      ],
    },
  };

  lineChartColors: Color[] = [

  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  @ViewChild('map', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  selectedSensorId: string;

  constructor() {

  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    const mapImg = new Image();
    mapImg.src = "assets/image/DP-1.jpg";

    mapImg.onload = () => {
      this.ctx.drawImage(mapImg, 0, 0, mapImg.width * 0.25, mapImg.height * 0.25);
      this.sensorModel.forEach(s => {
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = s.color;
        this.ctx.fill();
      });
    };

    this.canvas.nativeElement.addEventListener('click', (e) => {
      let x = e.pageX - this.canvas.nativeElement.getBoundingClientRect().left - document.documentElement.scrollLeft;
      let y = e.pageY - this.canvas.nativeElement.getBoundingClientRect().top - document.documentElement.scrollTop;


      console.log(x, y)

      const mousePos = {
        x: x,
        y: y
      };

      const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;

      const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;

      this.sensorModel.forEach(sensor => {
        if (color == sensor.color) {
          this.lineChartData.forEach(l => l.hidden = l.label != sensor.id);
          this.selectedSensorId = sensor.id;
          this.chart.update();
        }
      });
    });
  }

}

export class SensorTableModel {
  constructor(
    public id: string,
    public temperature: number,
    public lastMeasureDate: Date,
    public active: boolean,
    public x: number,
    public y: number,
    public color: string
  ) {
  }
}
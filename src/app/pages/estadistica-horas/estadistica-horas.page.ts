import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

//Chart.js
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-estadistica-horas',
  templateUrl: './estadistica-horas.page.html',
  styleUrls: ['./estadistica-horas.page.scss'],
})
export class EstadisticaHorasPage implements AfterViewInit {

  @ViewChild('canvas') private canvas: ElementRef;

  barChart: any;
  myChart: Chart;

  fecha: Date = new Date();

  constructor() { }

  ngAfterViewInit() {
    if (this.barChart) {
      this.barChart.destroy();
    } else {
      this.barChartMethod();
    }
  }

  onSearchChange(event){

  }


  barChartMethod() {

    this.barChart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['12-14', '14-16', '16-18', '18-20', '20-22', '22-02'],
        datasets: [{
          label: 'Número de Clientes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },

    });
  }

}

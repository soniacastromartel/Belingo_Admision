import {
  AfterViewInit,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';

//Chart.js
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { Imonthstats } from 'src/app/interfaces/imonthstats';
import { EstadisticaMesService } from 'src/app/services/estadistica-mes.service';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Component({
  selector: 'app-estadistica-mes',
  templateUrl: './estadistica-mes.page.html',
  styleUrls: ['./estadistica-mes.page.scss'],
})
export class EstadisticaMesPage implements AfterViewInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  monthStats: Imonthstats = {
    key: '',
    hombres: 0,
    mujeres: 0,
  };

  doughnutChart: any;

  myChart: Chart;
  // ctx = document.getElementById('canvas');

  data: any;

  name: string;

  constructor(private estadisticaMesService: EstadisticaMesService) {}

  ngAfterViewInit() {
    this.estadisticaMesService
      .getMonthStats()
      .snapshotChanges()
      .subscribe((data) => {
        console.log(data);
        data.forEach((item) => {
          console.log(item.payload.val());
          this.monthStats.hombres= item.payload.val().hombres;
          this.monthStats.mujeres = item.payload.val().mujeres;
          this.name = item.key;
          console.log(item.key);

        });

        if (this.doughnutChart) {
          this.doughnutChart.destroy();
        } else {
          this.doughnutChartMethod(this.monthStats.hombres, this.monthStats.mujeres,this.name);
        }
      });
  }

  doughnutChartMethod(hombres, mujeres, name) {

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Hombres', 'Mujeres'],
        datasets: [
          {
            label: name,
            data: [hombres, mujeres],
            backgroundColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            hoverBackgroundColor: [
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
            ],
            borderWidth: 1,
            borderColor: '#616161',
          },
        ],
      },
    });
  }
}

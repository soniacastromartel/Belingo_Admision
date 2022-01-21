import {
  AfterViewInit,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';

//Chart.js
import { Chart, registerables } from 'chart.js';
import { Access } from 'src/app/interfaces/iaccess';
import { Session } from 'src/app/interfaces/isession';
import { EntranceService } from 'src/app/services/entrance.service';
import { SessionService } from 'src/app/services/session.service';
Chart.register(...registerables);

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements AfterViewInit {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  doughnutChart: any;

  myChart: Chart;
  // ctx = document.getElementById('canvas');

  data: Observable<any>;
  ref: AngularFireList<any>;

  aforo;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Accesos = [];

  acceso: Access = {
    $key: '',
    fechaHoraEntrada: '',
    clientKey: '',
    sessionKey: '',
    dni: '',
    conflictivo: '',
    sexo: '',
  };

  sesion: Session = {
    $key: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    usuario: '',
    aforo: 0,
  };

  size;

  chartData = null;

  constructor(
    private sessionService: SessionService,
    private entranceService: EntranceService,
    private db: AngularFireDatabase
  ) {

  }

  async ngAfterViewInit() {

    await this.sessionService.getAforo().then(async (data) => {
      this.aforo= data;
       await this.sessionService.getLast().then((response) => {
         console.log(response);
         this.entranceService.getAccesos().snapshotChanges().subscribe((res)=>{
          this.Accesos=[];
          res.forEach((item)=> {
            if (response === item.payload.val().sessionKey) {
              const a= item.payload.toJSON();
              console.log( item.payload.val().sessionKey);
              // eslint-disable-next-line @typescript-eslint/dot-notation
              a ['$key'] = item.key;
              this.Accesos.push(a as Access);
              this.size= this.Accesos.length;

            }

          });
          console.log(this.aforo);
          console.log(this.size);
          this.doughnutChartMethod(this.size,this.aforo);


         });
       });
    });

  }

  doughnutChartMethod(size,aforo) {
    console.log(aforo);

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Ocupado', 'Restante'],
        datasets: [
          {
            label: 'Aforo',
            data: [size, aforo],
            backgroundColor: [
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            hoverBackgroundColor: [
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
            ],
            borderWidth: 1,
            borderColor:'#616161',
          },
        ],
      },
    });
  }

  async onClick() {
   await this.sessionService.getAforo().then((data) => {
     console.log(data);
   });

  }

}

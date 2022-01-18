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

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
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
  Accesos= [];

  acceso: Access ={
    $key: '',
    fechaHoraEntrada: '',
    clientKey: '',
    sessionKey: '',
    dni: '',
    conflictivo: '',
    sexo: '',
  };

  sesion: Session ={
    $key:'',
    fechaHoraInicio:'',
    fechaHoraFin: '',
    usuario: '',
    aforo:0
  };

  size;

  chartData= null;

  constructor(private sessionService: SessionService, private entranceService: EntranceService,
    private db: AngularFireDatabase) {}

 async ngAfterViewInit() {
   console.log(this.onClick());

  const key = await this.sessionService.getKey();
  const session = this.sessionService.getSessionById(key);
  session.snapshotChanges().subscribe((snap) => {
    console.log(snap.key);
    console.log(snap.payload.val());
    const a= snap.payload.val();
    this.sesion=a;
    console.log(this.sesion.aforo);
    return this.sesion.aforo;
  });
  const accessRes= this.entranceService.getAccesos();
  accessRes.snapshotChanges().subscribe((res) => {
    this.Accesos=[];
    res.forEach((item)=> {
      if (key === item.payload.val().sessionKey) {
        const a= item.payload.toJSON();
        console.log( item.payload.val().sessionKey);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        a ['$key'] = item.key;
        this.Accesos.push(a as Access);
        this.size= this.Accesos.length;

      }
    });
    console.log(this.size);
  });
  console.log(this.size);
  console.log(this.sesion.aforo);

this.doughnutChartMethod();

}




  doughnutChartMethod() {

const tamanio = this.Accesos.length;
console.log(tamanio);


    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Ocupado', 'Restante'],
        datasets: [
          {
            label: 'Aforo',
            data: [30,200],
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
            borderWidth:1,
            borderColor: 'rgba(54, 162, 235, 1)'
          },
        ],
      },
    });
  }



  async onClick() {

    const key = await this.sessionService.getKey();
  const session = this.sessionService.getSessionById(key);
  session.snapshotChanges().subscribe((snap) => {
    console.log(snap.key);
    console.log(snap.payload.val());
    this.aforo= snap.payload.val().aforo;
    console.log(this.aforo);

  });
  }
ionViewDidLoad() {

  this.ref= this.db.list('sesion', ref => ref.orderByChild('aforo'));
  this.ref.valueChanges().subscribe(result =>{
    
  })
  if(this.chartData){

  }

}

}

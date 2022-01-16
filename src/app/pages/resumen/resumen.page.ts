import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Access } from 'src/app/interfaces/iaccess';
import { Session } from 'src/app/interfaces/isession';
import { EntranceService } from 'src/app/services/entrance.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
sesion: Session ={
  $key:'',
  fechaHoraInicio:'',
  fechaHoraFin: '',
  usuario: ''
};

currentSession: Session;
key: '';

// eslint-disable-next-line @typescript-eslint/naming-convention
Accesos = [];

acceso: Access ={
  $key: '',
  fechaHoraEntrada: '',
  clientKey: '',
  sessionKey: '',
  dni: '',
  conflictivo: '',
  sexo: '',
};

size;



  constructor(private sessionService: SessionService, private entranceService: EntranceService) {
    // this.sesion = this.sessionService.getSession();

   }

  async ngOnInit() {
    const key = await this.sessionService.getKey();
    const session = this.sessionService.getSessionById(key);
    session.snapshotChanges().subscribe((snap) => {
      console.log(snap.key);
      console.log(snap.payload.val());
      const a= snap.payload.val();
      this.sesion=a;
      console.log(this.sesion);
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
    });
  }

  imprimirSesion(){
    // console.log('OBTENER SESION');
    // const valor = this.sessionService.getKey().then(result => {
    //   console.log(result);
    //   const x = this.sessionService.getSessionById(result);
    //   console.log(x.query);
    // });
    // console.log(valor);
  }


}

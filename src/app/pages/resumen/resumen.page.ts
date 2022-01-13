import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from 'src/app/interfaces/isession';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
sesion={
  $key:'',
  fechaHoraInicio:'',
  usuario: ''
};

currentSession: Session;
key: '';


  constructor(private sessionService: SessionService) {

   }

  ngOnInit() {
    // this.key = this.sessionService.getLastSession();
    // console.log(this.key);
  }

  imprimirSesion(){
    console.log('OBTENER SESION');
    const valor = this.sessionService.getLastSession();
    console.log(valor);
  }

  obtenerSesion(){
    this.sessionService.getCurrentSession();
  }

}

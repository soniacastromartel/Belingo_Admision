import { Component, OnInit } from '@angular/core';
import { Access } from 'src/app/interfaces/iaccess';
import { EntranceService } from 'src/app/services/entrance.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-listado-accesos',
  templateUrl: './listado-accesos.page.html',
  styleUrls: ['./listado-accesos.page.scss'],
})
export class ListadoAccesosPage implements OnInit {

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

  textoBuscar = '';

  size;


  constructor(private entranceService: EntranceService,
    private sessionService: SessionService) {

  }

  async ngOnInit() {
    this.fetchAccess();
    const key = await this.sessionService.getKey();
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
        }

      });
    });
  }


  fetchAccess() {
    this.entranceService
      .getAccesos()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
    console.log(this.textoBuscar);
  }
}

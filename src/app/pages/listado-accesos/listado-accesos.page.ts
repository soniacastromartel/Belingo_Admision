import { Component, OnInit } from '@angular/core';
import { Access } from 'src/app/interfaces/iaccess';
import { EntranceService } from 'src/app/services/entrance.service';

@Component({
  selector: 'app-listado-accesos',
  templateUrl: './listado-accesos.page.html',
  styleUrls: ['./listado-accesos.page.scss'],
})
export class ListadoAccesosPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Accesos = [];

  acceso = {
    fechaHoraEntrada: '',
    clientKey: '',
    dni: '',
    conflictivo: '',
    sexo: '',
  };

  textoBuscar = '';


  constructor(private entranceService: EntranceService) {

  }

  ngOnInit() {
    this.fetchAccess();
    const accessRes= this.entranceService.getAccesos();
    accessRes.snapshotChanges().subscribe((res) => {
      this.Accesos=[];
      res.forEach((item)=> {
        const a= item.payload.toJSON();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        a ['$key'] = item.key;
        this.Accesos.push(a as Access);
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

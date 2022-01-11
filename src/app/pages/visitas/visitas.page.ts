import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/interfaces/iclient';
import { Client } from 'src/app/models/client';
import { DataService } from 'src/app/services/client.service';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Clients = [];

  client: Client = {
    key: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    dni: '',
    telefono: '',
    sexo: '',
    email: '',
    img: '',
    fechaNaci: '',
  };

  dni = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchClients();
    const clientRes = this.dataService.getClients();
    clientRes.snapshotChanges().subscribe((res) => {
      this.Clients = [];
      res.forEach((item) => {
        const a = item.payload.toJSON();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        a['$key'] = item.key;
        this.Clients.push(a as IClient);
      });
    });
  }

  fetchClients() {
    this.dataService
      .getClients()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

  onSearchChange(event) {
    this.dni = event.detail.value;
    console.log(event.detail);

  }

}

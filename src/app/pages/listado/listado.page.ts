import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from 'src/app/services/client.service';

import { Client } from 'src/app/models/client';
import { Observable } from 'rxjs';
import {
  AlertController,
  IonInfiniteScroll,
  IonList,
  ModalController,
} from '@ionic/angular';
import { AltasPage } from '../altas/altas.page';
import { ModalFichaPage } from '../modal-ficha/modal-ficha.page';
import { IClient } from 'src/app/interfaces/iclient';
import { Access } from 'src/app/interfaces/iaccess';
import { EntranceService } from 'src/app/services/entrance.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  @ViewChild(IonList) ionList: IonList;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // clients: Observable<any>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Clients = [];

  client = {
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

  acceso = {
    fechaHoraEntrada: '',
    dni: '',
    sexo: '',
    conflictivo: '',
    clientKey: ''

  };

  message = '';

  fecha: Date = new Date();


  container = document.getElementById('container');

  textoBuscar = '';

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private entranceService: EntranceService
  ) {
    // this.clients = this.dataService.getClients();
  }

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

  // load() {
  //   this.dataService.getClients().subscribe((results) => {
  //     this.clients = results;
  //     console.log(this.clients);
  //   });
  // }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
    console.log(this.textoBuscar);
  }

  updateClient(id, client) {
    this.dataService.updateClient(id, client);
    console.log('actualizado!');
    this.ionList.closeSlidingItems();
  }

  // delete(client: any) {
  //   this.presentAlert();
  //   console.log('delete', client.nombre);
  //   this.ionList.closeSlidingItems();
  // }

  deleteClient(key) {
      console.log(key);
      this.dataService.deleteClient(key);
      console.log('borrado');
  }

  async presentAlert(key) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Atención',
      subHeader: 'Está a punto de eliminar un cliente',
      message: '¿Desea Continuar?',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            console.log('Click en OK');
            this.deleteClient(key);
            this.ionList.closeSlidingItems();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'rojo',
          handler: () => {
            console.log('Click en Cancelar');
            this.ionList.closeSlidingItems();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAccessAlert(nombre: string, apellido: string) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Accesos',
      subHeader: 'El acceso para el cliente '+ nombre+' '+apellido+ ' se ha realizado con éxito',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
            this.ionList.closeSlidingItems();
          },
        },
      ],
    });

    await alert.present();
  }

  async showModal(client, id) {
    const modal = await this.modalCtrl.create({
      component: ModalFichaPage,
      componentProps: {
        id,
        nombre: client.nombre,
        apellido1: client.apellido1,
        apellido2: client.apellido2,
        email: client.email,
        telefono: client.telefono,
        dni: client.dni,
        sexo: client.sexo,
        fecha: client.fechaNaci,
        img: client.img,
        conflictivo: client.conflictivo
      },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
    client = {
      nombre: data.nombre,
      apellido1: data.apellido1,
      apellido2: data.apellido2,
      dni: data.dni,
      telefono: data.telefono,
      sexo: data.sexo,
      email: data.email,
      img: data.img,
      fechaNaci: data.fechaNaci,
      conflictivo: data.conflictivo
    };
    this.updateClient(id, client);
    this.ionList.closeSlidingItems();
    console.log(id);
    console.log(client);
    console.log(data);

  }

  registrarAcceso(client, id) {
    console.log(id);
    this.acceso = {
      fechaHoraEntrada: this.fecha.toISOString(),
      dni: client.dni,
      conflictivo: client.conflictivo,
      sexo: client.sexo,
      clientKey: id
    };
    console.log(this.acceso);
    this.entranceService.createAcceso(this.acceso).then((res) => {
      this.presentAccessAlert(client.nombre, client.apellido1);

      console.log(res.key);
      console.log('registrado acceso');
      // this.modalCtrl.dismiss();

    })
    .catch((error) => console.log(error));

  }
}

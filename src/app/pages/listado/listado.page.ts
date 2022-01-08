import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from 'src/app/services/data.service';

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

  message = '';

  container = document.getElementById('container');

  textoBuscar = '';

  constructor(
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
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
    };
    this.updateClient(id, client);
    this.ionList.closeSlidingItems();
    console.log(id);
    console.log(client);
    console.log(data);

  }
}

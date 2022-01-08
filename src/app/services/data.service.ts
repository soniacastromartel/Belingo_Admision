import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from '../interfaces/icomponent';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { IClient } from '../interfaces/iclient';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  clients: AngularFireList<any>;
  client: AngularFireObject<IClient>;

  dbPath = '/clients';

  constructor(private http: HttpClient, private afd: AngularFireDatabase) {
    this.clients = this.afd.list(this.dbPath);
  }

  getMenuOptions() {
    return this.http.get<Componente[]>('assets/data/menu.json');
  }

  getClients() {
    this.clients = this.afd.list(this.dbPath);
    return this.clients;
  }

  getClientById(id: string) {
    this.client= this.afd.object ('/clients/' + id);
    return this.client;
    // return this.clients.find(client.key);
  }

  createClient(client: IClient) {
    return this.clients.push({
      nombre: client.nombre,
      apellido1: client.apellido1,
      apellido2: client.apellido2,
      dni: client.dni,
      email: client.email,
      telefono: client.telefono,
      img: client.img,
      fechaNaci: client.fechaNaci,
      sexo: client.sexo,
      conflictivo: client.conflictivo
    });
  }

  deleteClient(id: string) {
    this.client = this.afd.object('/clients/' + id);
    this.client.remove();
  }

  updateClient(id: string, client: IClient){
    this.client = this.afd.object('/clients/' + id);
    console.log(id);
    console.log(client);
    return this.client.update({
      nombre: client.nombre,
      apellido1: client.apellido1,
      apellido2: client.apellido2,
      dni: client.dni,
      email: client.email,
      telefono: client.telefono,
      // img: client.img,
      fechaNaci: client.fechaNaci,
      sexo: client.sexo,
      // conflictivo: client.conflictivo
    });
  }
}

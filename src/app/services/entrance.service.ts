import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Access } from '../interfaces/iaccess';

@Injectable({
  providedIn: 'root'
})
export class EntranceService {

  accesos: AngularFireList<any>;
  acceso: AngularFireObject<any>;

  dbPath = '/accesos';

  constructor(private afd: AngularFireDatabase) {
    this.accesos= this.afd.list(this.dbPath);

  }

  getAccesos() {
    this.accesos = this.afd.list(this.dbPath);
    return this.accesos;
  }

createAcceso(acceso: any) {
  return this.accesos.push({
    fechaHoraEntrada: acceso.fechaHoraEntrada,
    dni: acceso.dni,
    sexo: acceso.sexo,
    conflictivo: acceso.conflictivo,
    clientKey: acceso.clientKey,
  });
}

  deleteAcceso(id: string) {
    this.acceso = this.afd.object('/accesos/' + id);
    this.acceso.remove();
  }
}

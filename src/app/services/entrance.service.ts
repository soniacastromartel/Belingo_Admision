/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import  firebase from 'firebase/compat';
import { Access } from '../interfaces/iaccess';

@Injectable({
  providedIn: 'root'
})
export class EntranceService {

  accesos: AngularFireList<any>;
  acceso: AngularFireObject<Access>;

  dbPath = '/accesos';

  constructor(private afd: AngularFireDatabase) {
    this.accesos= this.afd.list(this.dbPath);

  }

  getAccesos() {
    this.accesos = this.afd.list(this.dbPath);
    return this.accesos;
  }

createAcceso(acceso: any) {
 this.afd.database.ref('accesos').orderByChild('dni').equalTo(acceso.dni).on('child_added', function(data) {
    console.log(data.exists()? 'exixste': 'no existe');
  }, function(error) {
    console.log(error);
  });;


  return this.accesos.push({
    fechaHoraEntrada: acceso.fechaHoraEntrada,
    dni: acceso.dni,
    sexo: acceso.sexo,
    conflictivo: acceso.conflictivo,
    clientKey: acceso.clientKey,
    sessionKey: acceso.sessionKey
  });
}

  deleteAcceso(id: string) {
    this.acceso = this.afd.object('/accesos/' + id);
    this.acceso.remove();
  }
}

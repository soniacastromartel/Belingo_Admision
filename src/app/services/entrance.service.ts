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

  return this.afd.database.ref('accesos').orderByChild('sessionKey').equalTo(acceso.sessionKey).once('value', snapshot=> {
    if (snapshot.exists()) {
      console.log(snapshot.val());


      this.afd.database.ref('accesos').orderByChild('clientKey').equalTo(acceso.clientKey).once('value', snap=>{
        if(snap.exists){
          console.log('el cliente ya ha entrado');
        }else{
          this.accesos.push({
            fechaHoraEntrada: acceso.fechaHoraEntrada,
            dni: acceso.dni,
            sexo: acceso.sexo,
            conflictivo: acceso.conflictivo,
            clientKey: acceso.clientKey,
            sessionKey: acceso.sessionKey
          });
        }

      });

    }else {
      console.log('no existe');
    }
    // console.log(data.exists()? 'existe': 'no existe');
    // console.log(data);
    // console.log(acceso.dni);
  }, function(error) {
    console.log(error);
  });;

  // return this.accesos.push({
  //   fechaHoraEntrada: acceso.fechaHoraEntrada,
  //   dni: acceso.dni,
  //   sexo: acceso.sexo,
  //   conflictivo: acceso.conflictivo,
  //   clientKey: acceso.clientKey,
  //   sessionKey: acceso.sessionKey
  // });
}

checkAcceso(acceso: any) {
  this.afd.database.ref('accesos').orderByChild('dni').equalTo(acceso.dni).on('child_added', function(data) {
    console.log(data.exists()? 'existe': 'no existe');
  }, function(error) {
    console.log(error);
  });;
}

  deleteAcceso(id: string) {
    this.acceso = this.afd.object('/accesos/' + id);
    this.acceso.remove();
  }
}

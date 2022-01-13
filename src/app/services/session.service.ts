/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { promise } from 'protractor';
import { Session } from '../interfaces/isession';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  key: '';
  horaInicio: '';
  horaFin: '';
  usuario: '';

  sesion= {
    fechahora: '',
    usuario: ''
  };

  sessions: AngularFireList<any>;
  session: AngularFireObject<Session>;

  dbPath = '/sesion';

  constructor(private afd: AngularFireDatabase) {
    this.sessions = this.afd.list(this.dbPath);
  }

  getSessions(): AngularFireList<any> {
    this.sessions = this.afd.list(this.dbPath);
    return this.sessions;
  }

  getLastSession() {
    const ref = this.afd.database.ref(this.dbPath);
    let key;
    const valor = ref.limitToLast(1).on('child_added', function(snapshot) {
      // obtener la ultima lave inserters
      console.log(snapshot.val());
      console.log(snapshot.key);
      key = snapshot.key;
      // horaI= snapshot.val().fechaHoraInicio;
      // horaF= snapshot.val().fechaHoraFin;
      // user= snapshot.val().usuario;
    });

    this.key = key;
    console.log(this.key);
    return this.key;
  }

  getCurrentSession() {
    const ref = this.afd.database.ref(this.dbPath);
    // let sesion;
    const valor = ref.limitToLast(1).on('child_added', function(snapshot) {
      // obtener la ultima lave inserters
      console.log(snapshot.val());
     this.sesion= this.snapshot.val();
      console.log(this.sesion);

      // horaI= snapshot.val().fechaHoraInicio;
      // horaF= snapshot.val().fechaHoraFin;
      // user= snapshot.val().usuario;
    });

    // this.sesion = sesion;
    console.log(this.sesion);
    return this.sesion;
  }

  getSessionById(id: string) {
    this.session = this.afd.object('/sesion/' + id);
    return this.session;
    // return this.clients.find(client.key);
  }

  createSession(session: any) {
    return this.sessions.push({
      fechaHora: session.fechaHoraInicio,
      usuario: session.usuario,
    });
  }

  deleteSession(id: string) {
    this.session = this.afd.object('/sesion/' + id);
    this.session.remove();
  }
}

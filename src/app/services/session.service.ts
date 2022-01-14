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
  key: string;
  // horaInicio: '';
  // horaFin: '';
  // usuario: '';

  sesion: Session = {
    $key: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    usuario: '',
  };

  sessions: AngularFireList<any>;
  session: AngularFireObject<any>;

  dbPath = '/sesion';

  constructor(private afd: AngularFireDatabase) {
    this.sessions = this.afd.list(this.dbPath);
  }

  getSessions(): AngularFireList<any> {
    this.sessions = this.afd.list(this.dbPath);
    return this.sessions;
  }



  getLast() {
    return new Promise<string>((resolve) => {
      const ref = this.afd.database.ref(this.dbPath);
      ref.limitToLast(1).on('child_added', function(snapshot) {
        // obtener la ultima llave
        console.log(snapshot.val());
        console.log(snapshot.key);
        resolve(snapshot.key);
      });
    });
  }

  async getKey(): Promise<string> {
    this.key = await this.getLast();
    console.log(this.key);
    return this.key;
  }

  // this.session = this.afd.object('/sesion/' + id);

  getSessionById() {
    return new Promise<AngularFireObject<Session>>(async (resolve) => {
      await this.getLast().then((result) => {
        console.log(result);
        this.session = this.afd.object('/sesion/' + result);
        console.log(this.session);
        resolve(this.session);
      });
    });
  }


  createSession(session: any) {
    return this.sessions.push({
      fechaHoraInicio: session.fechaHoraInicio,
      usuario: session.usuario,
      // fechaHoraFin: session.fechaHoraFin
    });
  }

  deleteSession(id: string) {
    this.session = this.afd.object('/sesion/' + id);
    this.session.remove();
  }
}

/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { Session } from '../interfaces/isession';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  key: string;

  sesion: Session = {
    $key: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    usuario: '',
    aforo: 200
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

  getLast() {
    return new Promise<string>((resolve) => {
      const ref = this.afd.database.ref(this.dbPath);
      ref.limitToLast(1).on('child_added', function(snapshot) {
        // obtener la ultima llave
        console.log(snapshot.val());
        resolve(snapshot.key);
      });
    });
  }

  async getKey(): Promise<string> {
    this.key = await this.getLast();
    return this.key;
  }

  getSessionById(id: string) {
  this.session= this.afd.object('/sesion/' +id);
  return this.session;
  }


  createSession(session: any) {
    return this.sessions.push({
      fechaHoraInicio: session.fechaHoraInicio,
      usuario: session.usuario,
      aforo: session.aforo
    });
  }

  deleteSession(id: string) {
    this.session = this.afd.object('/sesion/' + id);
    this.session.remove();
  }

  updateSession(id: string){
    this.session= this.afd.object('/sesion/' + id);
   return this.session.update({
     aforo: this.sesion.aforo --
    });
  }

}

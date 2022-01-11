import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Session } from '../interfaces/isession';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessions: AngularFireList<any>;
  session: AngularFireObject<Session>;

  dbPath ='/sesion';

  constructor(private afd: AngularFireDatabase) {
    this.sessions = this.afd.list(this.dbPath);
  }

  getSessions(): AngularFireList<any> {
    this.sessions = this.afd.list(this.dbPath);
    return this.sessions;
  }

  createSession(session: any){
    return this.sessions.push({
      fechaHora: session.fechaHoraInicio,
      usuario: session.usuario
    });
  }

  deleteSession(id: string) {
    this.session = this.afd.object('/sesion/' + id);
    this.session.remove();
  }

}

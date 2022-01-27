import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { User } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: AngularFireList<any>;
  user: AngularFireObject<any>;

  dbPath = '/empleados';
  ref;

  constructor(private afd: AngularFireDatabase) {
    this.users = this.afd.list(this.dbPath);
    this.ref = this.afd.database.ref(this.dbPath);
  }

  getUsers(): AngularFireList<any> {
    this.users = this.afd.list(this.dbPath);
    return this.users;
  }

  getUserById(id: string) {
    this.user = this.afd.object('/empleados/' + id);
    return this.user;
    // return this.clients.find(client.key);
  }

  createUser(user: User) {
    // No se puede hacer un push ya que se generaría un key automático y queremos que el key sea el uid
   return this.ref.child(user.uid).set(user);
  }

  deleteUser(id: string) {
    this.user = this.afd.object('/empleados/' + id);
    this.user.remove();
  }

  updateUser(id: string, user: User) {
    this.user = this.afd.object('/empleados/' + id);
    console.log(id);
    console.log(user);
    return this.user.update({
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      uid: user.uid
    });
  }


}

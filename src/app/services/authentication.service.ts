import { Injectable } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

picture;
name;
email;

  constructor(public auth: AngularFireAuth) {}

  login(email: string, password: string) {
    console.log(email, password);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async loginGoogle() {
    // const res = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    // const user = res.user;
    // console.log(user);
    // this.picture = user.photoURL;
    // this.name = user.displayName;
    // this.email = user.email;
    this.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
 }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut();
  }

async getUid() {
  const user = await this.auth.currentUser;
  console.log(user);
  if (user === null) {
    return null;
  } else {
    console.log(user.uid);
    return user.uid;
  }
}



async getUser() {
  const user = await this.auth.currentUser;
  console.log(user);
  if (user === null) {
    return null;
  } else {
    return user;
  }
}

}

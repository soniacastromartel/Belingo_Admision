/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/interfaces/isession';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionService } from 'src/app/services/session.service';
import {App} from '@capacitor/app';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit{

  sesion: Session = {
    key: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    usuario: '',
    aforo: 0
  };

  end: Date = new Date();

  constructor(private router: Router,
    private authService: AuthenticationService,
    private sessionService: SessionService
    ) { }


  async ngOnInit()  {
    const key = await this.sessionService.getKey();
    const session = this.sessionService.getSessionById(key);
    session.snapshotChanges().subscribe((snap) => {
      console.log(snap.key);
      console.log(snap.payload.val());
      const a = snap.payload.val();
      this.sesion = a;
      this.sesion.key= snap.key;
      console.log(this.sesion.key);
    });

  }




  async onClick() {
    console.log(this.sesion.key);
    console.log(this.end.toISOString());
    await this.sessionService
      .updateSessionEnd(this.sesion.key, this.end.toISOString())
      .then(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
        console.log('sesión cerrada');
      });
    }


//Cerrar Android
  closeApp(){
    App.exitApp();
  }


  }



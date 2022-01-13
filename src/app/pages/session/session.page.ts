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
    $key: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    usuario: ''
  };



  constructor(private router: Router,
    private authService: AuthenticationService,
    ) { }


  ngOnInit()  {
    // const currentSession = this

  }




  onClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    }

//Cerrar Android
  closeApp(){
    App.exitApp();
  }


  }



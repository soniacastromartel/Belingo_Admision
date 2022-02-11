import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { NavController } from '@ionic/angular';
// import { Session } from 'src/app/interfaces/isession';
// import { AuthenticationService } from 'src/app/services/authentication.service';
// import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage implements OnInit {

  // sesion: Session = {
  //   key: '',
  //   fechaHoraInicio: '',
  //   fechaHoraFin: '',
  //   usuario: '',
  //   aforo: 200,
  // };

  end: Date = new Date();

  slides: {
    img: string;
    titulo: string;
    desc: string;
    link: string;
  }[] = [
    {
      img: '/assets/img/c.png',
      titulo: 'CREAR USUARIOS',
      desc: 'Crear nuevos usuarios y asignarles contraseña en el sistema',
      link: '/create-user'
    },
    {
      img: '/assets/img/calendar.svg',
      titulo: 'ENVIAR PROMOS',
      desc: 'Enviar promociones y publicidad a los clientes',
      link: '/action-sheet'
    },
    {
      img: '/assets/img/placeholder-1.svg',
      titulo: 'CREAR ESTABLECIMIENTOS',
      desc: 'Crear un nuevo establecimiento y ubicar en mapa su geolocalización',
      link: '/button'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }


  // async endSession() {
  //   console.log(this.sesion.key);
  //   console.log(this.end.toISOString());
  //   await this.sessionService
  //     .updateSessionEnd(this.sesion.key, this.end.toISOString())
  //     .then(() => {
  //       this.authService.logout();
  //       this.router.navigate(['/login']);
  //       console.log('sesión cerrada');
  //     });
  // }

  onClick() {
    this.router.navigate(['/home']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/interfaces/isession';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  sesion: Session = {
    key: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    usuario: '',
    aforo: 200,
  };

  end: Date = new Date();


  constructor(private authService: AuthenticationService,
    private sessionService: SessionService, private router: Router) { }

  async ngOnInit() {
    const key = await this.sessionService.getKey();
    const session = this.sessionService.getSessionById(key);
    session.snapshotChanges().subscribe((snap) => {
      console.log(snap.key);
      console.log(snap.payload.val());
      const a = snap.payload.val();
      this.sesion = a;
      this.sesion.key = snap.key;
      console.log(this.sesion.key);
    });
  }

  async onClick(){
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



}

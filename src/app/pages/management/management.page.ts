import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from 'src/app/interfaces/isession';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage implements OnInit {

  sesion: Session = {
    key: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    usuario: '',
    aforo: 200,
  };

  end: Date = new Date();

  constructor(private router: Router,
    private authService: AuthenticationService,
    private sessionService: SessionService,) { }

  ngOnInit() {
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

}

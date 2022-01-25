import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/interfaces/isession';
import { User } from 'src/app/interfaces/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isAdmin: boolean = false;
  data;

  pelele=true;

  sesion: Session = {
    key: '',
    fechaHoraInicio: '',
    fechaHoraFin: '',
    usuario: '',
    aforo: 200,
  };

  // user = {
  //   key: '',
  //   uid: '',
  //   email: '',
  //   password: '',
  //   isAdmin: false,
  //   nombre: '',
  // };

  end: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private userService: UserService
  ) {
    this.isAdmin =
      this.router.getCurrentNavigation().extras.state.isAdmin.queryParams.isAdmin;
    this.data =
      this.router.getCurrentNavigation().extras.state.isAdmin.queryParams;
    console.log(this.isAdmin);
    console.log(this.data);
  }

  async ngOnInit() {
    console.log(this.isAdmin);
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

    // await this.authService.getUid().then(async (uid) => {
    //   console.log(uid);
    //   this.userService
    //     .getUserById(uid)
    //     .snapshotChanges()
    //     .subscribe((res) => {
    //       console.log(res.payload.val());
    //       this.isAdmin = res.payload.val().isAdmin;
    //       console.log(this.isAdmin);
    //     });
    // });
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

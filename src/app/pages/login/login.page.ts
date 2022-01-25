import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Session } from 'src/app/interfaces/isession';
import { User } from 'src/app/interfaces/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user;
  loginForm: FormGroup;

  usuario: User = {
    key: '',
    uid: '',
    email: '',
    password: '',
    nombre: '',
    isAdmin: false,
    // emailVerified: boolean;
  };

  session = {
    key: '',
    fechaHoraInicio: '',
    usuario: '',
    aforo: 200,
  };

  sessionKey;

  fecha: Date = new Date();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private userService: UserService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.usuario.email = this.loginForm.value.email;
      this.usuario.password = this.loginForm.value.password;
      this.login(this.usuario);
      console.log('submit');
      console.log(this.usuario);
    }
  }

  async login(usuario: User) {
    console.log(this.user);

    this.session = {
      key: this.sessionKey,
      fechaHoraInicio: this.fecha.toISOString(),
      usuario: usuario.email,
      aforo: 200,
    };

    this.sessionService
      .createSession(this.session)
      .then((res) => {
        console.log(res.key);
        this.sessionKey = res.key;
        console.log('sesion iniciada');
      })
      .catch((error) => console.log(error));

    await this.authService
      .login(usuario.email, usuario.password)
      .then(async () => {
        await this.authService
          .getUid()
          .then((uid) => {
            this.userService
              .getUserById(uid)
              .snapshotChanges()
              .subscribe((snap) => {
                console.log(snap.key);
                console.log(snap.payload.val());
                const a = snap.payload.val();
                this.user = a;

                const objToSend: NavigationExtras = {
                  queryParams: {
                    isAdmin: this.user.isAdmin,
                    key: this.sessionKey,
                  },
                };

                this.router.navigate(['/home'], {
                  state: { isAdmin: objToSend },
                });

              });
            // console.log(this.user);
            // console.log(uid);


          })
          .catch((error) => {
            this.presentAlert();
            console.log(error);
          });

        //   this.sessionService
        //     .createSession(this.session)
        //     .then((res) => {
        //       console.log(res.key);
        //       console.log('sesion iniciada');
        //     })
        //     .catch((error) => console.log(error));
        //   this.router.navigate(['/home'], {
        //     state: {isAdmin: objToSend}
        //   });
        // })
        // .catch((error) => {
        //   this.presentAlert();
        //   console.log(error);
      });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Login',
      subHeader: 'El email o el password son incorrectos',
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }
}

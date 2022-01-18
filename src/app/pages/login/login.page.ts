import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Session } from 'src/app/interfaces/isession';
import { User } from 'src/app/interfaces/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  usuario: User = {
    uid: '',
    email: '',
    password: '',
    nombre: '',
    photoURL: '',
    // emailVerified: boolean;
  };

  session = {
    fechaHoraInicio: '',
    usuario: '',
    aforo: 200
  };

  fecha: Date = new Date();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
      ]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.usuario.email = this.loginForm.value.email;
      this.usuario.password = this.loginForm.value.password;
      this.login(this.usuario.email, this.usuario.password);
      console.log('submit');
      console.log(this.usuario);
    }

  }

  login(email: string, password: string) {

this.session ={
  fechaHoraInicio:this.fecha.toISOString(),
  usuario: email,
  aforo: 200
};

    this.authService
      .login(email, password)
      .then(() => {
        this.sessionService.createSession(this.session).then((res) => {
          console.log(res.key);
          console.log('sesion iniciada');

        })
        .catch((error) => console.log(error));
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.presentAlert();
        console.log(error);
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
          handler: () => {
          },
        },
      ],
    });

    await alert.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    private sessionService: SessionService
  ) {}

  ngOnInit() {}

  onSubmit(formulario: NgForm) {
    this.usuario.email = formulario.value.email;
    this.usuario.password = formulario.value.password;
    this.login(this.usuario.email, this.usuario.password);
    console.log('submit');
    console.log(this.usuario);
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
      .catch((error) => console.log(error));
  }
}

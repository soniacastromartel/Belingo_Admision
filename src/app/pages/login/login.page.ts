import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(
    private authService: AuthenticationService,
    private router: Router
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
    this.authService.login(email, password).then(() => {
      this.router.navigate(['/home']);
    }). catch (error => console.log(error));
  }
}

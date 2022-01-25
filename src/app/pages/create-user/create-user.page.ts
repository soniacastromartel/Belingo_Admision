import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  userForm: FormGroup;

  user: User = {
    key: '',
    uid: '',
    email: '',
    password: '',
    isAdmin: false,
    nombre: '',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService, private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      uid: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isAdmin: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      await this.authService
        .register(this.userForm.value.email, this.userForm.value.password)
        .then(async () => {
          await this.authService.getUid().then((uid) => {
            this.user = this.userForm.value;
            this.user.uid = uid;
            this.user.key= uid;
            console.log(this.user);
            console.log(uid);
            this.userService
              .createUser(this.user)
              .then(() => {
                this.presentRegistrationAlert(this.user.nombre);
                this.userForm.reset();
              })
              .catch((error) => console.log(error));
          });
        });
    } else {
      return false;
    }
  }

  async presentRegistrationAlert(nombre: string) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Empleados',
      subHeader: 'Se ha registrado '+ nombre+ '  con éxito',
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

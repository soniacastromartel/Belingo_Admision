import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/client.service';

import { FireStorageService } from 'src/app/services/firestorage.service';

import * as uuid from 'uuid';

import { Filesystem, Directory } from '@capacitor/filesystem';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import * as moment from 'moment';
import {
  ActionSheetController,
  IonDatetime,
  LoadingController,
  Platform,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Clientphoto } from 'src/app/interfaces/iclientphoto';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.page.html',
  styleUrls: ['./altas.page.scss'],
})
export class AltasPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  clientForm: FormGroup;

  fechaNaci: Date = new Date();

  client = {
    $key: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    dni: '',
    telefono: '',
    sexo: '',
    email: '',
    img: '',
    fechaNaci: '',
    conflictivo: '',
  };

  img: '';


  constructor(
    private dataService: DataService,
    private router: Router,
    private fb: FormBuilder,
    private plt: Platform,
    public actionSheetController: ActionSheetController,
    public fireStorageService: FireStorageService
  ) {}

   ngOnInit() {
    // await this.fireStorageService.loadSaved();
    this.clientForm = this.fb.group({
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      dni: [''],
      telefono: [''],
      sexo: [''],
      email: [''],
      img: [''],
      fechaNaci: [''],
      conflictivo: 'no',
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.client = this.clientForm.value;
      this.savePhoto().then(() => {
        console.log(this.clientForm.value);
        console.log(this.client);
        console.log(this.client.img);

        this.dataService
          .createClient(this.client)
          .then((res) => {
            console.log(this.client);
            console.log(res);
            console.log(res.key);
            this.clientForm.reset();
          })
          .catch((error) => console.log(error));
      });
    } else {
      return false;
    }
  }

  //PHOTO
  onClick() {
    this.fireStorageService.addNewToGallery();
    console.log('take a pic!');
  }

   newImageUpload(file: File) {
    const path = 'Clientes';
    // const name = 'prueba.jpg';
    // const file = event.target.files [0];
    const res = this.fireStorageService.uploadImage(file, path, file.name);

    res.then((data) => {
      console.log(data);
      this.client.img = data;
      console.log(this.client.img);
    });
  }

  async savePhoto() {
    const photo = this.fireStorageService.photos[0];
    console.log(photo);

    let imageFile;
    const pr1 = fetch(photo.webviewPath);
    const pr2 = pr1.then((x) => x.blob());
    const pr3 = pr2.then((data) => {
      imageFile = new File([data], uuid.v4() + '_' + photo.filepath, {
        type: 'image/png',
      });

      //this.newImageUpload(imageFile);

      const path = 'Clientes';
      // const name = 'prueba.jpg';
      // const file = event.target.files [0];
      const res = this.fireStorageService.uploadImage(
        imageFile,
        path,
        imageFile.name
      );

      return res.then((imgUri) => {
        console.log(imgUri);
        this.client.img = imgUri;
        console.log(this.client.img);
      });
    });

    await pr1;
    await pr2;
    await pr3;
    // .then((x) => x.blob())
    // .then((data) => {
    //   imageFile = new File([data], uuid.v4() + '_' + photo.filepath, {
    //     type: 'image/png',
    //   });

    //   this.newImageUpload(imageFile);
    // });
  }

  async showActionSheet(photo: Clientphoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [
        // {
        //   text: 'Aceptar',
        //   role: 'selected',
        //   icon: 'add',
        //   handler: () => {
        //     console.log(photo);
        //     console.log('Ha pasado por el base64 harcodeado');

        //     let imageFile;
        //     fetch(photo.webviewPath)
        //       .then((x) => x.blob())
        //       .then((data) => {
        //         imageFile = new File([data], uuid.v4() + '_' + photo.filepath, {
        //           type: 'image/png',
        //         });

        //         this.newImageUpload(imageFile);
        //       });
        //   },
        // },
        {
          text: 'Borrar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.fireStorageService.deletePicture(photo, position);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  cambioFecha(event) {
    console.log(new Date(event.detail.value));
    // console.log('date', moment(date).format('DD-MM-YYYY'));
  }
}

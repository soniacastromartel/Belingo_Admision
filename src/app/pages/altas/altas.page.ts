import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

import { FireStorageService } from 'src/app/services/firestorage.service';

import { Filesystem, Directory } from '@capacitor/filesystem';


import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';

import * as moment from 'moment';
import { ActionSheetController, IonDatetime, LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import {Clientphoto } from 'src/app/interfaces/iclientphoto';

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
    conflictivo: ''
  };

  customPickerOptions = {
    buttons: [
      {
        text: 'Aceptar',
        handler: (event) => {},
      },
      {
        text: 'Mundo',
      },
    ],
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private fb: FormBuilder,
    private plt: Platform,
    public actionSheetController: ActionSheetController,
  public fireStorageService: FireStorageService
  ) {}

 async ngOnInit() {
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
      console.log(this.clientForm.value);
      console.log(this.client);

      this.dataService
        .createClient(this.clientForm.value)
        .then((res) => {
          console.log(res);
          console.log(res.key);
          this.clientForm.reset();
        })
        .catch((error) => console.log(error));
    } else {
      return false;
    }
  }


  //PHOTO
  onClick() {
    this.fireStorageService.addNewToGallery();
    console.log('take a pic!');
  }

  // takePicture = async () => {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Uri,
  //   });

  //   // image.webPath will contain a path that can be set as an image src.
  //   // You can access the original file using image.path, which can be
  //   // passed to the Filesystem API to read the raw data of the image,
  //   // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  //   const imageUrl = image.webPath;
  //   console.log(imageUrl);
  //   if (image) {
  //     console.log(imageUrl);
  //     this.newImageUpload(imageUrl);

  //   }
  //   // Can be set to the src of an image now
  //   // imageElement.src = imageUrl;
  // };

  async newImageUpload(file: any)
{
  const path = 'Clientes';
  const name = 'prueba.jpg';
// const file = event.target.files [0];
  const res= await this.fireStorageService.uploadImage(file, path, name);
  console.log(res);
  this.client.img = res;

}

 async showActionSheet(photo: Clientphoto, position: number) {
  const actionSheet = await this.actionSheetController.create({
    header: 'Fotos',
    buttons: [
      {
        text: 'Aceptar',
        role: 'selected',
        icon: 'add',
        handler: () => {
          console.log(photo.filepath);

          this.newImageUpload(photo.filepath);
        }
      },
      {
      text: 'Borrar',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        this.fireStorageService.deletePicture(photo, position);
      }
    }, {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
       }
    }]
  });
  await actionSheet.present();
}


  cambioFecha(event) {
    console.log(new Date(event.detail.value));
    // console.log('date', moment(date).format('DD-MM-YYYY'));
  }
}

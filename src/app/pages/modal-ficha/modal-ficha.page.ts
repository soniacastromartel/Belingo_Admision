import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-ficha',
  templateUrl: './modal-ficha.page.html',
  styleUrls: ['./modal-ficha.page.scss'],
})
export class ModalFichaPage implements OnInit {
  @Input() nombre: string;
  @Input() apellido1: string;
  @Input() apellido2: string;
  @Input() dni: string;
  @Input() telefono: string;
  @Input() sexo: string;
  @Input() email: string;
  @Input() img: string;
  @Input() fecha: any;
  @Input() conflictivo: string;

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

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  onClick() {
    this.modalCtrl.dismiss();
  }

  onSubmit(formulario: NgForm) {
    console.log(this.fecha);
    this.modalCtrl.dismiss({
      nombre: formulario.value.nombre,
      apellido1: formulario.value.apellido1,
      apellido2: formulario.value.apellido2,
      dni: formulario.value.dni,
      telefono: formulario.value.telefono,
      sexo: formulario.value.sexo,
      email: formulario.value.email,
      fechaNaci:this.fecha,
      conflictivo: this.conflictivo
    });
    // this.client.nombre= this.nombre;
    // this.client.apellido1= this.apellido1;
    // this.client.apellido2= this.apellido2;
    // this.client.dni= this.dni;
    // this.client.email= this.email;
    // this.client.sexo= this.sexo;
    // this.client.telefono= this.telefono;
    // this.client.fechaNaci= this.fecha;
    // this.client.img= this.img;

    // console.log(this.client);
    // console.log('hola');
    // this.dataService.updateClient(this.client).then((data) => {
    //   console.log(data.key);
    //   console.log('actualizado');
    // });
  }

  cambioFecha(event) {
    // console.log(event);
    this.fecha= event.detail.value;
    console.log(this.fecha);
    // console.log('date', moment(date).format('DD-MM-YYYY'));
  }

  registrarAcceso(){

  }
}

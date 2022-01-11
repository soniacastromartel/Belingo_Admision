import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/client.service';
import { EntranceService } from 'src/app/services/entrance.service';

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
    private dataService: DataService,
    private entranceService: EntranceService
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
      conflictivo: formulario.value.conflictivo
    });

  }


  cambioFecha(event) {
    // console.log(event);
    this.fecha= event.detail.value;
    console.log(this.fecha);
    // console.log('date', moment(date).format('DD-MM-YYYY'));
  }

}

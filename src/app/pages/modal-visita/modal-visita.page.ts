import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-visita',
  templateUrl: './modal-visita.page.html',
  styleUrls: ['./modal-visita.page.scss'],
})
export class ModalVisitaPage implements OnInit {
  @Input() dni: string;

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


  constructor(private modalCtrl: ModalController) {

   }

  ngOnInit() {
  }




}

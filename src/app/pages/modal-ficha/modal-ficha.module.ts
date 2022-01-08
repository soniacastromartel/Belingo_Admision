import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule,FormBuilder } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFichaPageRoutingModule } from './modal-ficha-routing.module';

import { ModalFichaPage } from './modal-ficha.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalFichaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModalFichaPage]
})
export class ModalFichaPageModule {}

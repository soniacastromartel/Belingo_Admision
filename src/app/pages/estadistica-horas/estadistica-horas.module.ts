import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaHorasPageRoutingModule } from './estadistica-horas-routing.module';

import { EstadisticaHorasPage } from './estadistica-horas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EstadisticaHorasPageRoutingModule
  ],
  declarations: [EstadisticaHorasPage]
})
export class EstadisticaHorasPageModule {}

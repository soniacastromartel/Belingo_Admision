import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaPageRoutingModule } from './estadistica-routing.module';

import { EstadisticaPage } from './estadistica.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstadisticaPage]
})
export class EstadisticaPageModule {}

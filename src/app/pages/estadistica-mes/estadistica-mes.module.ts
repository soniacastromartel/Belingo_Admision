import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticaMesPageRoutingModule } from './estadistica-mes-routing.module';

import { EstadisticaMesPage } from './estadistica-mes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EstadisticaMesPageRoutingModule
  ],
  declarations: [EstadisticaMesPage]
})
export class EstadisticaMesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoAccesosPageRoutingModule } from './listado-accesos-routing.module';

import { ListadoAccesosPage } from './listado-accesos.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoAccesosPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ListadoAccesosPage]
})
export class ListadoAccesosPageModule {}

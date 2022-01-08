import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitasPageRoutingModule } from './visitas-routing.module';

import { VisitasPage } from './visitas.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitasPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [VisitasPage]
})
export class VisitasPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltasPageRoutingModule } from './altas-routing.module';

import { AltasPage } from './altas.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AltasPageRoutingModule,
    ComponentsModule,
    SharedDirectivesModule
  ],
  declarations: [AltasPage]
})
export class AltasPageModule {}

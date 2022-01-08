import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './headerMenu/header.component';
import { IonicModule } from '@ionic/angular';
import { Header2Component } from './header2/header2.component';



@NgModule({
  declarations: [HeaderComponent, Header2Component],
  exports: [HeaderComponent, Header2Component],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }

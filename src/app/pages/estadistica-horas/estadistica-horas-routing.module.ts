import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticaHorasPage } from './estadistica-horas.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaHorasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticaHorasPageRoutingModule {}

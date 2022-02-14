import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticaMesPage } from './estadistica-mes.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticaMesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticaMesPageRoutingModule {}

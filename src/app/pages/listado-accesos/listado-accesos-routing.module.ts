import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoAccesosPage } from './listado-accesos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoAccesosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoAccesosPageRoutingModule {}

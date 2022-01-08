import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFichaPage } from './modal-ficha.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFichaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFichaPageRoutingModule {}

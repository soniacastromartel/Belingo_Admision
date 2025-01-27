import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/tabs/estadistica',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
    {  path: 'estadistica',
    loadChildren: () => import ('../estadistica/estadistica.module').then(m => m.EstadisticaPageModule),

  }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

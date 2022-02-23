import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {

    path: 'session',
    loadChildren: () => import('./pages/session/session.module').then( m => m.SessionPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'altas',
    loadChildren: () => import('./pages/altas/altas.module').then( m => m.AltasPageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./pages/listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'visitas',
    loadChildren: () => import('./pages/visitas/visitas.module').then( m => m.VisitasPageModule)
  },
  {
    path: 'modal-ficha',
    loadChildren: () => import('./pages/modal-ficha/modal-ficha.module').then( m => m.ModalFichaPageModule)
  },
  {
    path: 'estadistica',
    loadChildren: () => import('./pages/estadistica/estadistica.module').then( m => m.EstadisticaPageModule)
  },
  {
    path: 'listado-accesos',
    loadChildren: () => import('./pages/listado-accesos/listado-accesos.module').then( m => m.ListadoAccesosPageModule)
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then( m => m.ResumenPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages/create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'management',
    loadChildren: () => import('./pages/management/management.module').then( m => m.ManagementPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },  {
    path: 'modal-visita',
    loadChildren: () => import('./pages/modal-visita/modal-visita.module').then( m => m.ModalVisitaPageModule)
  },
  {
    path: 'estadistica-mes',
    loadChildren: () => import('./pages/estadistica-mes/estadistica-mes.module').then( m => m.EstadisticaMesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'estadistica-horas',
    loadChildren: () => import('./pages/estadistica-horas/estadistica-horas.module').then( m => m.EstadisticaHorasPageModule)
  },
  {
    path: 'promos',
    loadChildren: () => import('./pages/promos/promos.module').then( m => m.PromosPageModule)
  },
  {
    path: 'establecimientos',
    loadChildren: () => import('./pages/establecimientos/establecimientos.module').then( m => m.EstablecimientosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

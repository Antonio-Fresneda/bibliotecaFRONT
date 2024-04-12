import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./layouts/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./layouts/component/component.module').then(m => m.ComponentsModule)
      },
      {
        path:'autor',
        loadChildren:()=>import('./pages/apps/autor/autor.module').then(m =>m.AutorModule)

      },
      {
        path:'genero',
        loadChildren:()=>import('./pages/apps/genero/genero.module').then(m =>m.GeneroModule)

      },
      {
        path:'libros',
        loadChildren:()=>import('./pages/apps/libros/libros.module').then(m =>m.LibroModule)

      },
      {
        path:'biblioteca',
        loadChildren:()=>import('./pages/apps/biblioteca/biblioteca.module').then(m =>m.BibliotecaModule)

      },
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(Approutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

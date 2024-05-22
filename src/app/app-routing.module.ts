import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginPageComponent } from './pages/apps/login/pages/login-pages/login-page.component';
import { RegistrarPageComponent } from './pages/apps/login/pages/registrar-pages/registrar-page.component';
import { RolModule } from './pages/apps/rol/rol.module';

export const Approutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'registrar',
    component: RegistrarPageComponent
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
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
      {
        path:'usuario',
        loadChildren:()=>import('./pages/apps/login/login.module').then(m =>m.LoginModule)

      },
      {
        path:'rol',
        loadChildren:()=>import('./pages/apps/rol/rol.module').then(m =>m.RolModule)

      },
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
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

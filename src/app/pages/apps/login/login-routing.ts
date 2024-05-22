import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-pages/login-page.component';
import { Usuario } from './interfaces/usuario';
import { UsuarioPageComponent } from './pages/usuario-pages/usuario-page.component';


const routes: Routes=[
  {
    path:'',
    component:UsuarioPageComponent

  },


]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class LoginRoutingModule { }

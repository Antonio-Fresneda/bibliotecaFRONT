import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneroPageComponent } from './pages/genero-page.component';

const routes: Routes=[
  {
    path:'',
    component:GeneroPageComponent

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
export class GeneroRoutingModule { }

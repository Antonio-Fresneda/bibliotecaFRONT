import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroPageComponent } from './pages/libro-page.component';

const routes: Routes=[
  {
    path:'',
    component:LibroPageComponent

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
export class LibroRoutingModule { }

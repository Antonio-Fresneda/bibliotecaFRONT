import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorPageComponent } from './pages/autor-page.component';

const routes: Routes=[
  {
    path:'',
    component:AutorPageComponent

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
export class AutorRoutingModule { }

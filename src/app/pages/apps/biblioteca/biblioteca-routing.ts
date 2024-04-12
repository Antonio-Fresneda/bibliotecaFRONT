import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiblitoecaPageComponent } from './pages/biblioteca-page.component';


const routes: Routes=[
  {
    path:'',
    component:BiblitoecaPageComponent

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
export class BibliotecaRoutingModule { }

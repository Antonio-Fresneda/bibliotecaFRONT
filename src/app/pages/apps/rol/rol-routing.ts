import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolPageComponent } from './pages/rol-page.component';


const routes: Routes=[
  {
    path:'',
    component:RolPageComponent

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
export class RolRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermisoDirective } from './has-permiso.directive';


@NgModule({
  declarations: [HasPermisoDirective],
  imports: [CommonModule],
  exports: [HasPermisoDirective]
})
export class SharedModule { }

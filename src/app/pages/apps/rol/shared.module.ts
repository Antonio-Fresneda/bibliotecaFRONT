import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermisoDirective } from './has-permiso.directive';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationComponent } from 'src/app/@fury/shared/header/navigation.component';

@NgModule({
  declarations: [HasPermisoDirective, NavigationComponent],
  imports: [CommonModule, TranslateModule.forChild()],
  exports: [
    HasPermisoDirective,
    TranslateModule,
    NavigationComponent
  ]
})
export class SharedModule { }

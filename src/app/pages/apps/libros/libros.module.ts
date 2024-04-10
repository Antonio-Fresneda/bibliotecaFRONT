import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/layouts/component/component.module';
import { LibroPageComponent } from './pages/libro-page.component';
import { LibroRoutingModule } from './libro-routing';
import { LibroTableComponent } from './components/genero-table/libro-table.component';




@NgModule({
  declarations: [
   LibroPageComponent,
   LibroTableComponent

  ],
  imports: [
    CommonModule,
    LibroRoutingModule,
    ComponentsModule,
    FormsModule

  ]

})
export class LibroModule { }

import { NgModule } from '@angular/core';
import { GeneroTableComponent } from './components/genero-table/genero-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/layouts/component/component.module';
import { GeneroPageComponent } from './pages/genero-page.component';
import { GeneroRoutingModule } from './genero-routing';
import { GeneroTableFiltrosComponent } from './components/genero-table-filtros/genero-table-filtros.component';

@NgModule({
  declarations: [
   GeneroTableComponent,
   GeneroPageComponent,
   GeneroTableFiltrosComponent

  ],
  imports: [
    CommonModule,
    GeneroRoutingModule,
    ComponentsModule,
    FormsModule

  ]

})
export class GeneroModule { }

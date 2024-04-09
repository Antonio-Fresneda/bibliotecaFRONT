import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorPageComponent } from './pages/autor-page.component';
import { AutorRoutingModule } from './autor-routing.module';
import { ComponentsModule } from '../component/component.module';
import { AutorTableComponent } from './components/autor-table/autor-table.component';
import { AutorTableIdComponent } from './components/autor-table-id/autor-table-id.component';
import { AutorTableFiltrosComponent } from './components/autor-table-filtros/autor-table-filtros.component';



@NgModule({
  declarations: [
    AutorTableComponent,
    AutorTableIdComponent,
    AutorTableFiltrosComponent,
    AutorPageComponent
  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    ComponentsModule
  ]
})
export class AutorModule { }

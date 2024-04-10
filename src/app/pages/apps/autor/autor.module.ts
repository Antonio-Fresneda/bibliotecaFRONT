import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutorPageComponent } from './pages/autor-page.component';
import { AutorRoutingModule } from './autor-routing.module';
import { AutorTableComponent } from './components/autor-table/autor-table.component';
import { AutorTableIdComponent } from './components/autor-table-id/autor-table-id.component';
import { AutorTableFiltrosComponent } from './components/autor-table-filtros/autor-table-filtros.component';
import { AutorTableFiltrosPostComponent } from './components/autor-table-filtros-post/autor-table-filtros-post.component';


@NgModule({
  declarations: [
    AutorTableComponent,
    AutorTableIdComponent,
    AutorTableFiltrosComponent,
    AutorTableFiltrosPostComponent,
    AutorPageComponent,

  ],
  imports: [
    CommonModule,
    AutorRoutingModule,
    FormsModule
  ]
})
export class AutorModule { }

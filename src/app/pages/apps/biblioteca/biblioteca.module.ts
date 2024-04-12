import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/layouts/component/component.module';
import { BibliotecaRoutingModule } from './biblioteca-routing';
import { BibliotecaTableComponent } from './components/biblioteca-table/biblioteca-table.component';
import { BiblitoecaPageComponent } from './pages/biblioteca-page.component';
import { BibliotecaTableFiltrosComponent } from './components/biblioteca-table-filtros/biblioteca-table-filtros.component';




@NgModule({
  declarations: [
    BibliotecaTableComponent,
    BiblitoecaPageComponent,
    BibliotecaTableFiltrosComponent

  ],
  imports: [
    CommonModule,
    BibliotecaRoutingModule,
    ComponentsModule,
    FormsModule

  ]

})
export class BibliotecaModule { }

import { Libro } from './../../interfaces/libro';
import { Component, Input } from '@angular/core';



@Component({
  selector: 'libro-table-filtros',
  templateUrl: 'libro-table-filtros.component.html'
})

export class LibroTableFiltrosComponent {

  @Input()
  public librosFiltros:Libro[]=[];
}

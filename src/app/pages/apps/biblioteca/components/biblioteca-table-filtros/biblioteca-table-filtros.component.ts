
import { Component, Input } from '@angular/core';
import { Biblioteca } from '../../interfaces/biblioteca';


@Component({
  selector: 'biblioteca-table-filtros',
  templateUrl: 'biblioteca-table-filtros.component.html'
})

export class BibliotecaTableFiltrosComponent {

  @Input()
  public bibliotecaFiltros:Biblioteca[]=[];
}

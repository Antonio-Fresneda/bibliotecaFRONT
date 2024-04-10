import { Genero } from './../../interfaces/genero';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'genero-table-filtros',
  templateUrl: 'genero-table-filtros.component.html'
})

export class GeneroTableFiltrosComponent {

  @Input()
  public generosFiltros:Genero[]=[];
}

import { Component, Input } from '@angular/core';
import { Autor } from '../../interfaces/autor';

@Component({
  selector: 'autor-table-filtros',
  templateUrl: 'autor-table-filtros.component.html'
})

export class AutorTableFiltrosComponent {

  @Input()
  public autoresFiltros:Autor[]=[];
}

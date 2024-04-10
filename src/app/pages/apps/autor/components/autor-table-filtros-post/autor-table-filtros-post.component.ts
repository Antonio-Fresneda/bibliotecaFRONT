import { Component, Input } from '@angular/core';
import { Autor } from '../../interfaces/autor';

@Component({
  selector: 'autor-table-filtros-post',
  templateUrl: 'autor-table-filtros-post.component.html'
})

export class AutorTableFiltrosPostComponent {

  @Input()
  public autoresBusqueda:Autor[]=[];
}

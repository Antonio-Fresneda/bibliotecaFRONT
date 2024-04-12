import { Component, Input } from '@angular/core';
import { Libro } from '../../interfaces/libro';

@Component({
  selector: 'libro-table',
  templateUrl: 'libro-table.component.html'
})

export class LibroTableComponent {

  @Input()
  public libros:Libro[]=[];


}

import { Component, Input } from '@angular/core';
import { Biblioteca } from '../../interfaces/biblioteca';

@Component({
  selector: 'biblioteca-table',
  templateUrl: 'biblioteca-table.component.html'
})

export class BibliotecaTableComponent {

  @Input()
  public bibliotecas:Biblioteca[]=[];


}

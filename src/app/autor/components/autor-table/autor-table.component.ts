import { Component, Input } from '@angular/core';
import { Autor } from '../../interfaces/autor';

@Component({
  selector: 'autor-table',
  templateUrl: 'autor-table.component.html'
})

export class AutorTableComponent {

  @Input()
  public autores:Autor[]=[];


}

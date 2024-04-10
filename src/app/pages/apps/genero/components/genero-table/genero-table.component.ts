import { Component, Input } from '@angular/core';
import { Genero } from '../../interfaces/genero';

@Component({
  selector: 'genero-table',
  templateUrl: 'genero-table.component.html'
})

export class GeneroTableComponent {

  @Input()
  public generos:Genero[]=[];


}

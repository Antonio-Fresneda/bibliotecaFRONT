import { Component, Input } from '@angular/core';
import { Autor } from '../../interfaces/autor';

@Component({
  selector: 'autor-table-id',
  templateUrl: 'autor-table-id.component.html'
})

export class AutorTableIdComponent {

  @Input()
  public autoresId:Autor[]=[];
}

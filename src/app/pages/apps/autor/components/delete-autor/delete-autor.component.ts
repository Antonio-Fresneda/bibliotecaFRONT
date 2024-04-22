import { Component, OnInit } from '@angular/core';

import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../interfaces/autor';


@Component({
  selector: 'delete-autor',
  templateUrl: 'delete-autor.component.html'
})

export class DeleteAutorComponent  {

  public generoBorrar:Autor[]=[];

  public autor:Autor={} as Autor;

  constructor(
    private autorService: AutorService,
    private readonly _modalReference:ModalReference<Autor> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.autor=copy;
      }

  }
  deletedByAutorId(term:number){
    this.autorService.deleteAutorById(term).subscribe(autoresId => {
      if (Array.isArray(autoresId)) {
        this.generoBorrar = autoresId;
      } else {
        this.generoBorrar = [autoresId];
      }
      console.log(autoresId)
      location.reload()
    });
  }

}

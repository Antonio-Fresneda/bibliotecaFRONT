import { Component, OnInit } from '@angular/core';

import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Biblioteca } from '../../interfaces/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';


@Component({
  selector: 'delete-biblioteca',
  templateUrl: 'delete-biblio.component.html'
})

export class DeleteBibliotecaComponent  {

  public bibliotecaBorrar:Biblioteca[]=[];

  public biblioteca:Biblioteca={} as Biblioteca;

  constructor(
    private bibliotecaService: BibliotecaService,
    private readonly _modalReference:ModalReference<Biblioteca> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.biblioteca=copy;
      }

  }
  deleteByBibliotecaId(term:string){
    this.bibliotecaService.deleteBibliotecaById(term).subscribe(bibliotecaId => {
      if (Array.isArray(bibliotecaId)) {
        this.bibliotecaBorrar = bibliotecaId;
      } else {
        this.bibliotecaBorrar = [bibliotecaId];
      }
      location.reload()
    });
  }


}

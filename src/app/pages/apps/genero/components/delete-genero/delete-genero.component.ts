import { Component, OnInit } from '@angular/core';
import { GeneroService } from '../../services/genero.service';
import { Genero } from '../../interfaces/genero';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';


@Component({
  selector: 'delete-genero',
  templateUrl: 'delete-genero.component.html'
})

export class DeleteGeneroComponent  {

  public generoBorrar:Genero[]=[];

  public genero:Genero={} as Genero;

  constructor(
    private generoService: GeneroService,
    private readonly _modalReference:ModalReference<Genero> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.genero=copy;
      }

  }
  deletedByGeneroId(term: number) {
    this.generoService.deleteGeneroById(term).subscribe(generoBorrar => {
      if (Array.isArray(generoBorrar)) {
        this.generoBorrar = generoBorrar;
      } else {
        this.generoBorrar = [generoBorrar];
      }
      this._modalReference.closeSuccess();
      location.reload
    });
  }
}

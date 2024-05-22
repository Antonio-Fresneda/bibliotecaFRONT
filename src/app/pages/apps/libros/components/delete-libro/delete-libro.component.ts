import { Component, OnInit } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro';


@Component({
  selector: 'delete-libro',
  templateUrl: 'delete-libro.component.html'
})

export class DeleteLibroComponent  {

  public libroBorrar:Libro[]=[];

  public libro:Libro={} as Libro;

  constructor(
    private libroService: LibroService,
    private readonly _modalReference:ModalReference<Libro> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.libro=copy;
      }

  }
  deletedByLibroId(term:string){
    this.libroService.deleteLibroById(term).subscribe(libroId => {
      if (Array.isArray(libroId)) {
        this.libroBorrar = libroId;
      } else {
        this.libroBorrar = [libroId];
      }
      console.log(libroId)
      location.reload()
    });
  }

}

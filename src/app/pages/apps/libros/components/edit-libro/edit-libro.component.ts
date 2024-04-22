import { Component} from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro';

@Component({
  selector: 'edit-libro',
  templateUrl: 'edit-libro.component.html'
})

export class EditLibroComponent {

  public librosEditar:Libro[]=[];

  public libro:Libro={} as Libro;


  constructor(
    private libroService:LibroService,
    private readonly _modalReference:ModalReference<Libro> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.libro=copy;
      }
  }
  editarLibro(term:number,titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGenero:string): void {
    this.libroService.editarLibro(term,titulo,anoPublicacion,isbn,idAutor,idGenero)
      .subscribe(librosEditar => {
        if (Array.isArray(librosEditar)) {
          this.librosEditar = librosEditar;
        } else {
          this.librosEditar = [librosEditar];
        }
      });
  }

  editar(term:number,titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGenero:string): void {
    this.editarLibro(term,titulo,anoPublicacion,isbn,idAutor,idGenero);
    location.reload()
  }



}

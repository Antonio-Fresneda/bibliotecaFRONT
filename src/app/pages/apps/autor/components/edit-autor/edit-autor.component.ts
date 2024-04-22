import { Component} from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Autor } from '../../interfaces/autor';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'edit-autor',
  templateUrl: 'edit-autor.component.html'
})

export class EditAutorComponent {

  public autoresEditar:Autor[]=[];

  public autor:Autor={} as Autor;


  constructor(
    private autorService:AutorService,
    private readonly _modalReference:ModalReference<Autor> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.autor=copy;
      }
  }

  editarAutor(term: number, nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.autorService.editarAutor(term, nombre, fechaNacimiento, nacionalidad)
      .subscribe(autoresEditar => {
        if (Array.isArray(autoresEditar)) {
          this.autoresEditar = autoresEditar;
        } else {
          this.autoresEditar = [autoresEditar];
        }
      });
  }

  editar(term: number, nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.editarAutor(term, nombre, fechaNacimiento, nacionalidad);
    console.log(term,nombre,fechaNacimiento,nacionalidad)
    location.reload()
  }


}

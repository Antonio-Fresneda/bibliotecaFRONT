import { Component} from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Biblioteca } from '../../interfaces/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';


@Component({
  selector: 'edit-biblio',
  templateUrl: 'edit-biblio.component.html'
})

export class EditBibliotecaComponent {

  public bibliotecaEditar:Biblioteca[]=[];

  public biblioteca:Biblioteca={} as Biblioteca;


  constructor(
    private bibliotecaService:BibliotecaService,
    private readonly _modalReference:ModalReference<Biblioteca> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.biblioteca=copy;
      }
  }
  editarBiblioteca(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string): void {
    this.bibliotecaService.editarBiblioteca(
      term,nombreBiblioteca,direccion,telefono,email,sitioWeb)
      .subscribe(bibliotecaEditar => {
        if (Array.isArray(bibliotecaEditar)) {
          this.bibliotecaEditar = bibliotecaEditar;
        } else {
          this.bibliotecaEditar = [bibliotecaEditar];
        }
      }, error => {
        console.error('Error al editar:', error);
      });
  }

  editar(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,): void {
    this.editarBiblioteca(term,nombreBiblioteca,direccion,telefono,email,sitioWeb);
    location.reload()
  }




}

import { Component, OnInit } from '@angular/core';

import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { AutorService } from '../../services/autor.service';
import { Autor } from '../../interfaces/autor';


@Component({
  selector: 'new-autor',
  templateUrl: 'new-autor.component.html'
})

export class NewAutorComponent  {

  public autoresCrear:Autor[]=[];

  constructor(
    private autorService: AutorService,
    private readonly _ModalReference:ModalReference<Autor>

  ) { }

  crearAutor( nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.autorService.crearAutor( nombre, fechaNacimiento, nacionalidad)
      .subscribe(autoresCrear => {
        if (Array.isArray(autoresCrear)) {
          this.autoresCrear = autoresCrear;
        } else {
          this.autoresCrear = [autoresCrear];
        }
      }, error => {
        console.error('Error al crear autor:', error);
      });
  }

  crear( nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.crearAutor( nombre, fechaNacimiento, nacionalidad);
    location.reload()
  }




}

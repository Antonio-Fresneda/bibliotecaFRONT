import { Component, OnInit } from '@angular/core';

import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Biblioteca } from '../../interfaces/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';



@Component({
  selector: 'new-autor',
  templateUrl: 'new-biblioteca.component.html'
})

export class NewBibliotecaComponent  {

  public bibliotecaCrear:Biblioteca[]=[];

  constructor(
    private bibliotecaService: BibliotecaService,
    private readonly _ModalReference:ModalReference<Biblioteca>

  ) { }

  crearBiblioteca(nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.bibliotecaService.crearBiblioteca(
      nombreBiblioteca,direccion,telefono,email,sitioWeb,
      idLibro,titulo,anoPublicacion,isbn,
      idAutor,nombreAutor,fechaNacimiento,nacionalidad,
      idGenero,nombre,descripcion,edadRecomendada,urlWikipedia)
      .subscribe(bibliotecaCrear => {
        if (Array.isArray(bibliotecaCrear)) {
          this.bibliotecaCrear = bibliotecaCrear;
        } else {
          this.bibliotecaCrear = [bibliotecaCrear];
        }
      }, error => {
        console.error('Error al crear:', error);
      });
  }

  crear(nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.crearBiblioteca(nombreBiblioteca,direccion,telefono,email,sitioWeb,
      idLibro,titulo,anoPublicacion,isbn,
      idAutor,nombreAutor,fechaNacimiento,nacionalidad,
      idGenero,nombre,descripcion,edadRecomendada,urlWikipedia);
    location.reload()
  }





}

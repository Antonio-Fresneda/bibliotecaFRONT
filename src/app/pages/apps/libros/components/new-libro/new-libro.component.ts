import { Component, OnInit } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro';


@Component({
  selector: 'new-libro',
  templateUrl: 'new-libro.component.html'
})

export class NewLibroComponent implements OnInit {

  public librosCrear:Libro[]=[];

  constructor(
    private libroService: LibroService,
    private readonly _ModalReference:ModalReference<Libro>

  ) { }

  ngOnInit() { }

  crearLibro(titulo:string,anoPublicacion:string,isbn:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.libroService.crearLibro(titulo,anoPublicacion,isbn,nombreAutor,fechaNacimiento,nacionalidad, nombre, descripcion,edadRecomendada,urlWikipedia)
      .subscribe(librosCrear => {
        if (Array.isArray(librosCrear)) {
          this.librosCrear = librosCrear;
        } else {
          this.librosCrear = [librosCrear];
        }
      }, error => {
        console.error('Error al crear libro:', error);
      });
  }

  crear(titulo:string,anoPublicacion:string,isbn:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.crearLibro(titulo,anoPublicacion,isbn,nombreAutor,fechaNacimiento,nacionalidad, nombre, descripcion,edadRecomendada,urlWikipedia);
    console.log(titulo,anoPublicacion,isbn,nombreAutor,fechaNacimiento,nacionalidad, nombre, descripcion,edadRecomendada,urlWikipedia),
    location.reload()
  }
}

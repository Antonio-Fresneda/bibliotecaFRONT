import { Component, Input, OnInit } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro';
import { AutorService } from '../../../autor/services/autor.service';
import { Autor } from '../../../autor/interfaces/autor';
import { GeneroService } from '../../../genero/services/genero.service';
import { Genero } from '../../../genero/interfaces/genero';


@Component({
  selector: 'new-libro',
  templateUrl: 'new-libro.component.html'
})

export class NewLibroComponent implements OnInit {

  public librosCrear:Libro[]=[];

  public autorSeleccionado: string = '';
  public autores:Autor[]=[];

  public generoSeleccionado: string = '';
  public generos:Genero[]=[];


  constructor(
    private libroService: LibroService,
    private autorService:AutorService,
    private generoService:GeneroService,
    private readonly _ModalReference:ModalReference<Libro>

  ) { }

  ngOnInit() {
    this.busquedaInicialAutor();
    this.busquedaInicialGenero();
  }

  busquedaInicialAutor(): void {
    this.autorService.searchAutor().subscribe(
      autores => {
        this.autores = autores;
      }

    );
    console.log(this.autores)
  }

  busquedaInicialGenero(): void {
    this.generoService.searchGenero().subscribe(
      generos => {
        this.generos = generos;
      }

    );
    console.log(this.generos)
  }

  crearLibro(titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGenero: string): void {
    this.libroService.crearLibro(titulo,anoPublicacion,isbn,idAutor,idGenero)
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

  crear(titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGenero: string): void {
    this.crearLibro(titulo,anoPublicacion,isbn,idAutor,idGenero);
    console.log(titulo,anoPublicacion,isbn,idAutor,idGenero),
    location.reload()
  }
}

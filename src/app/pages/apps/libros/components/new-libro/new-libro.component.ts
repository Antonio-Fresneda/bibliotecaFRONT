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

  public generos:Genero[]= [] ;
  public generoSeleccionado: { [id: string]: boolean } = {};

  public dropdownOpen = false;

  constructor(
    private libroService: LibroService,
    private autorService:AutorService,
    private generoService:GeneroService,
    private readonly _modalReference:ModalReference<Libro>

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
  }

  busquedaInicialGenero(): void {
    this.generoService.searchGenero().subscribe(
      generos => {
        this.generos = generos;
      }

    );
  }


  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  cerrar(): void {
    this.dropdownOpen = false;
  }

  confirmSelection(titulo: string, anoPublicacion: string, isbn: string, idAutor: string): void {
    const idsSeleccionados = Object.keys(this.generoSeleccionado).filter(id => this.generoSeleccionado[id]);
    this.crearLibro(titulo, anoPublicacion, isbn, idAutor, idsSeleccionados);
  }

  crearLibro(titulo: string, anoPublicacion: string, isbn: string, idAutor: string, idsLibros: string[]): void {
    this.libroService.crearLibro(
      titulo, anoPublicacion, isbn, idAutor,
      idsLibros)
      .subscribe(librosCrear => {
        this.librosCrear = librosCrear;
      },error => {
        console.error('Error al crear libro:', error);
      }
    );
    location.reload();
  }
}

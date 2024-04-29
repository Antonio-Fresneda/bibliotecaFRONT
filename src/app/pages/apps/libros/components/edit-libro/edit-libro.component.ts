import { Component, OnInit} from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro';
import { AutorService } from '../../../autor/services/autor.service';
import { GeneroService } from '../../../genero/services/genero.service';
import { Genero } from '../../../genero/interfaces/genero';
import { Autor } from '../../../autor/interfaces/autor';

@Component({
  selector: 'edit-libro',
  templateUrl: 'edit-libro.component.html'
})

export class EditLibroComponent implements OnInit{

  public librosEditar:Libro[]=[];

  public libro:Libro={} as Libro;

  public autorSeleccionado: string = '';
  public autores:Autor[]=[];

  public generoSeleccionado: string = '';
  public generos:Genero[]=[];

  constructor(
    private libroService:LibroService,
    private autorService:AutorService,
    private generoService:GeneroService,
    private readonly _modalReference:ModalReference<Libro> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.libro=copy;
      }
  }
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

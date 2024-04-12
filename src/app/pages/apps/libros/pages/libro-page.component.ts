import { Component, OnInit } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'libro-page',
  templateUrl: 'libro-page.component.html'
})

export class LibroPageComponent implements OnInit {

  public libros: Libro[] = [];

  public libroId:Libro[] = [];

  public librosFiltros:Libro[]=[];

  public librosBusqueda:Libro[]=[]

  public librosCrear:Libro[]=[];

  public librosEditar:Libro[]=[];


  constructor(private libroService: LibroService) { }


  ngOnInit(): void {
    this.libroService.searchLibro().subscribe(
      libros => {
        this.libros = libros;
      }
    );
  }
  searchByLibroId(term:string){
    this.libroService.searchLibroById(term).subscribe(libroId => {
      if (Array.isArray(libroId)) {
        this.libroId = this.libroId;
      } else {
        this.libroId = [libroId];
      }
    });
  }
  deletedByLibroId(term:string){
    this.libroService.deleteLibroById(term).subscribe(libroId => {
      if (Array.isArray(libroId)) {
        this.libroId = libroId;
      } else {
        this.libroId = [libroId];
      }
      console.log(libroId)
      location.reload()
    });
  }

  searchGeneros(titulo?:string,anoPublicacion?:string,isbn?:string,direccion?:string): void {
    this.libroService.busquedaDinamica(titulo,anoPublicacion,isbn,direccion)
      .subscribe(librosFiltros => {
        if(Array.isArray(librosFiltros)){
        this.librosFiltros = librosFiltros;
      } else {
        this.librosFiltros = [librosFiltros];
      }
      console.log(librosFiltros)
    });
  }


  emitValue(titulo?:string,anoPublicacion?:string,isbn?:string,direccion?:string): void {
    this.searchGeneros(titulo,anoPublicacion,isbn,direccion);
    console.log(titulo,anoPublicacion,isbn,direccion);
  }

  busquedaLibro(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.libroService.busquedaLibro(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize)
      .subscribe(librosBusqueda => {
        if (Array.isArray(librosBusqueda)) {
          this.librosBusqueda = librosBusqueda;
        } else {
          this.librosBusqueda = [librosBusqueda];
        }
      });
  }

  busqueda(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.busquedaLibro(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);
    console.log(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);

  }

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

  editarLibro(term:string,titulo:string,anoPublicacion:string,isbn:string,idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,idGenero:string, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.libroService.editarLibro(term,titulo,anoPublicacion,isbn,idAutor,nombreAutor,fechaNacimiento,nacionalidad,idGenero, nombre, descripcion,edadRecomendada,urlWikipedia)
      .subscribe(librosEditar => {
        if (Array.isArray(librosEditar)) {
          this.librosEditar = librosEditar;
        } else {
          this.librosEditar = [librosEditar];
        }
      });
  }

  editar(term:string,titulo:string,anoPublicacion:string,isbn:string,idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,idGenero:string, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.editarLibro(term,titulo,anoPublicacion,isbn,idAutor,nombreAutor,fechaNacimiento,nacionalidad,idGenero, nombre, descripcion,edadRecomendada,urlWikipedia);
    console.log(term,titulo,anoPublicacion,isbn,idAutor,nombreAutor,fechaNacimiento,nacionalidad,idGenero, nombre, descripcion,edadRecomendada,urlWikipedia)
    location.reload()
  }


}











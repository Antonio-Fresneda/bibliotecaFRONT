import { Component, OnInit } from '@angular/core';
import { Autor } from '../interfaces/autor';
import { AutorService } from '../services/autor.service';
import { popper } from '@popperjs/core';

@Component({
  selector: 'autor-page',
  templateUrl: 'autor-page.component.html'
})

export class AutorPageComponent implements OnInit {
  public autores: Autor[] = [];

  public autoresId:Autor[] = [];

  public autoresFiltros:Autor[] = [];

  public autoresEditar:Autor[]=[]

  public autoresCrear:Autor[]=[]

  public autoresBusqueda:Autor[]=[]

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.autorService.searchAutor().subscribe(
      autores => {
        this.autores = autores;
      }
    );
  }
  searchByAutorId(term:string){
    this.autorService.searchAutorById(term).subscribe(autoresId => {
      if (Array.isArray(autoresId)) {
        this.autoresId = autoresId;
      } else {
        this.autoresId = [autoresId];
      }
      console.log(autoresId)
    });
  }

  deletedByAutorId(term:string){
    this.autorService.deleteAutorById(term).subscribe(autoresId => {
      if (Array.isArray(autoresId)) {
        this.autoresId = autoresId;
      } else {
        this.autoresId = [autoresId];
      }
      console.log(autoresId)
      location.reload()
    });
  }

  searchAutores(nombre?: string, fechaNacimiento?: string, nacionalidad?: string,direccion?:string): void {
    this.autorService.busquedaDinamica(nombre, fechaNacimiento, nacionalidad,direccion)
      .subscribe(autoresFiltros => {
        if(Array.isArray(autoresFiltros)){
        this.autoresFiltros = autoresFiltros;
      } else {
        this.autoresFiltros = [autoresFiltros];
      }
      console.log(autoresFiltros)
    });


}

  emitValue(nombre?: string, fechaNacimiento?: string, nacionalidad?: string,direccion?:string): void {
    this.searchAutores(nombre, fechaNacimiento, nacionalidad,direccion);
    console.log(nombre, fechaNacimiento, nacionalidad,direccion);
  }

  editarAutor(term: string, nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.autorService.editarAutor(term, nombre, fechaNacimiento, nacionalidad)
      .subscribe(autoresEditar => {
        if (Array.isArray(autoresEditar)) {
          this.autoresEditar = autoresEditar;
        } else {
          this.autoresEditar = [autoresEditar];
        }
      });
  }

  editar(term: string, nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.editarAutor(term, nombre, fechaNacimiento, nacionalidad);
    console.log(term,nombre,fechaNacimiento,nacionalidad)
    location.reload()
  }
  crearAutor(term: string, nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.autorService.crearAutor(term, nombre, fechaNacimiento, nacionalidad)
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

  crear(term: string, nombre: string, fechaNacimiento: string, nacionalidad: string): void {
    this.crearAutor(term, nombre, fechaNacimiento, nacionalidad);
    console.log(term, nombre, fechaNacimiento, nacionalidad);
    location.reload()
  }

  busquedaAutor(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.autorService.busquedaAutor(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize)
      .subscribe(autoresBusqueda => {
        if (Array.isArray(autoresBusqueda)) {
          this.autoresBusqueda = autoresBusqueda;
        } else {
          this.autoresBusqueda = [autoresBusqueda];
        }
      }, error => {
        console.error('Error al encontrar autor:', error);
      });
  }

  busqueda(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.busquedaAutor(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);
    console.log(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);

  }


}








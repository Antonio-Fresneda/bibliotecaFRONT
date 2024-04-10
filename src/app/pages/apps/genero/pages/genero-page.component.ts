import { Component, OnInit } from '@angular/core';
import { GeneroService } from '../services/genero.service';
import { Genero } from '../interfaces/genero';

@Component({
  selector: 'genero-page',
  templateUrl: 'genero-page.component.html'
})

export class GeneroPageComponent implements OnInit {

  public generos: Genero[] = [];

  public generoId:Genero[] = [];

  public generoCrear:Genero[]=[];

  public generoEditar:Genero[]=[]

  public generosFiltros:Genero[]=[]

  public generosBusqueda:Genero[]=[]

  constructor(private generoService: GeneroService) { }

  ngOnInit(): void {
    this.generoService.searchGenero().subscribe(
    generos => {
      this.generos = generos;
    }
  );
}
  searchByGeneroId(term:string){
    this.generoService.searchGeneroById(term).subscribe(generoId => {
      if (Array.isArray(generoId)) {
        this.generoId = this.generoId;
      } else {
        this.generoId = [generoId];
      }
    });
  }
  deletedByGeneroId(term:string){
    this.generoService.deleteGeneroById(term).subscribe(generoId => {
      if (Array.isArray(generoId)) {
        this.generoId = generoId;
      } else {
        this.generoId = [generoId];
      }
      console.log(generoId)
      location.reload()
    });
  }

  crearGenero(term: string, nombre: string, descripcion: string, edadRecomendada: string, urlWikipedia: string): void {
    this.generoService.crearGenero(term,nombre,descripcion,edadRecomendada,urlWikipedia)
      .subscribe(generoCrear => {
        if (Array.isArray(generoCrear)) {
          this.generoCrear = generoCrear;
        } else {
          this.generoCrear = [generoCrear];
        }
      }, error => {
        console.error('Error al crear autor:', error);
      });
  }

  crear(term: string, nombre: string, descripcion: string, edadRecomendada: string, urlWikipedia: string): void {
    this.crearGenero(term,nombre,descripcion,edadRecomendada,urlWikipedia);
    console.log(term,nombre,descripcion,edadRecomendada,urlWikipedia),
    location.reload()
  }

  editarGenero(term: string, nombre: string, descripcion: string, edadRecomendada: string, urlWikipedia: string): void {
    this.generoService.editarGenero(term,nombre,descripcion,edadRecomendada,urlWikipedia)
      .subscribe(generoEditar => {
        if (Array.isArray(generoEditar)) {
          this.generoEditar = generoEditar;
        } else {
          this.generoEditar = [generoEditar];
        }
      });
  }

  editar(term: string, nombre: string, descripcion: string, edadRecomendada: string, urlWikipedia: string): void {
    this.editarGenero(term,nombre,descripcion,edadRecomendada,urlWikipedia);
    console.log(term,nombre,descripcion,edadRecomendada,urlWikipedia)
    location.reload()
  }

  searchGeneros(nombre?:string,descripcion?:string,edadRecomendada?:string,urlWikipedia?:string,direccion?:string): void {
    this.generoService.busquedaDinamica(nombre, descripcion,edadRecomendada, urlWikipedia,direccion)
      .subscribe(generosFiltros => {
        if(Array.isArray(generosFiltros)){
        this.generosFiltros = generosFiltros;
      } else {
        this.generosFiltros = [generosFiltros];
      }
      console.log(generosFiltros)
    });


  }

  emitValue(nombre?:string,descripcion?:string,edadRecomendada?:string,urlWikipedia?:string,direccion?:string): void {
    this.searchGeneros(nombre, descripcion,edadRecomendada, urlWikipedia,direccion);
    console.log(nombre, descripcion,edadRecomendada, urlWikipedia,direccion);
  }

  busquedaGenero(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.generoService.busquedaAutor(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize)
      .subscribe(generosBusqueda => {
        if (Array.isArray(generosBusqueda)) {
          this.generosBusqueda = generosBusqueda;
        } else {
          this.generosBusqueda = [generosBusqueda];
        }
      }, error => {
        console.error('Error al encontrar el genero:', error);
      });
  }

  busqueda(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.busquedaGenero(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);
    console.log(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);

  }




}











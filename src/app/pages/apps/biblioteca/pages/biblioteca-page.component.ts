import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../services/biblioteca.service';
import { Biblioteca } from '../interfaces/biblioteca';


@Component({
  selector: 'biblioteca-page',
  templateUrl: 'biblioteca-page.component.html'
})

export class BiblitoecaPageComponent implements OnInit {

  public bibliotecas: Biblioteca[] = [];

  public bibliotecaId:Biblioteca[] = [];

  public bibliotecaCrear:Biblioteca[] = [];

  public bibliotecaEditar:Biblioteca[] = [];

  public bibliotecaFiltros:Biblioteca[] = [];

  public bibliotecaBusqueda:Biblioteca[] = [];

  constructor(private bibliotecaService: BibliotecaService) { }


  ngOnInit(): void {
    this.bibliotecaService.searchBiblioteca().subscribe(
      bibliotecas => {
        this.bibliotecas = bibliotecas;
      }
    );
  }

  searchByBibliotecaId(term:string){
    this.bibliotecaService.searchBibliotecaById(term).subscribe(bibliotecaId => {
      if (Array.isArray(bibliotecaId)) {
        this.bibliotecaId = this.bibliotecaId;
      } else {
        this.bibliotecaId = [bibliotecaId];
      }
    });
  }
  deleteByBibliotecaId(term:string){
    this.bibliotecaService.deleteBibliotecaById(term).subscribe(bibliotecaId => {
      if (Array.isArray(bibliotecaId)) {
        this.bibliotecaId = bibliotecaId;
      } else {
        this.bibliotecaId = [bibliotecaId];
      }
      location.reload()
    });
  }

  crearBiblioteca(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.bibliotecaService.crearBiblioteca(
      term,nombreBiblioteca,direccion,telefono,email,sitioWeb,
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

  crear(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.crearBiblioteca(term,nombreBiblioteca,direccion,telefono,email,sitioWeb,
      idLibro,titulo,anoPublicacion,isbn,
      idAutor,nombreAutor,fechaNacimiento,nacionalidad,
      idGenero,nombre,descripcion,edadRecomendada,urlWikipedia);
    location.reload()
  }


  editarBiblioteca(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.bibliotecaService.editarBiblioteca(
      term,nombreBiblioteca,direccion,telefono,email,sitioWeb,
      idLibro,titulo,anoPublicacion,isbn,
      idAutor,nombreAutor,fechaNacimiento,nacionalidad,
      idGenero,nombre,descripcion,edadRecomendada,urlWikipedia)

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

  editar(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.editarBiblioteca(term,nombreBiblioteca,direccion,telefono,email,sitioWeb,
      idLibro,titulo,anoPublicacion,isbn,
      idAutor,nombreAutor,fechaNacimiento,nacionalidad,
      idGenero,nombre,descripcion,edadRecomendada,urlWikipedia);
    location.reload()
  }
  searchBibliteca(nombre:string,direccion:string,telefono:string,email:string,sitioWeb:string,order:string): void {
    this.bibliotecaService.busquedaDinamica(nombre, direccion,telefono,email, sitioWeb,order)
      .subscribe(bibliotecaFiltros => {
        if(Array.isArray(bibliotecaFiltros)){
        this.bibliotecaFiltros = bibliotecaFiltros;
      } else {
        this.bibliotecaFiltros = [bibliotecaFiltros];
      }
    });
  }

  emitValue(nombre:string,direccion:string,telefono:string,email:string,sitioWeb:string,order:string): void {
    this.searchBibliteca(nombre, direccion,telefono,email, sitioWeb,order);
    console.log(nombre, direccion,telefono,email, sitioWeb,order);
  }

  busquedaBiblioteca(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.bibliotecaService.busquedaBiblioteca(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize)
      .subscribe(bibliotecaBusqueda => {
        if (Array.isArray(bibliotecaBusqueda)) {
          this.bibliotecaBusqueda = bibliotecaBusqueda;
        } else {
          this.bibliotecaBusqueda = [bibliotecaBusqueda];
        }
      }, error => {
        console.error('Error al encontrar el biblioteca:', error);
      });
  }

  busqueda(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.busquedaBiblioteca(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);
    console.log(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);

  }

}











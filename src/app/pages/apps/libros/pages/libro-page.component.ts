import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { LibroService } from '../services/libro.service';
import { NewLibroComponent } from '../components/new-libro/new-libro.component';
import { ModalService } from '@developer-partners/ngx-modal-dialog';

@Component({
  selector: 'libro-page',
  templateUrl: 'libro-page.component.html',
  styleUrls: ['libro-page.component.css']

})

export class LibroPageComponent implements OnInit {

  active=1;

  public libros: Libro[] = [];

  public libroId:Libro[] = [];

  public librosFiltros:Libro[]=[];

  public librosBusqueda:Libro[]=[]

  public librosCrear:Libro[]=[];

  public librosEditar:Libro[]=[];


  constructor(
    private libroService: LibroService,
    private readonly _modalService:ModalService) { }



  @ViewChild('txtValor') txtValor: any;


  ngOnInit(): void {
    this.libroService.searchLibro().subscribe(
      libros => {
        this.libros = libros;
      }
    );
  }

  busquedaInicial(): void {
    this.libroService.searchLibro().subscribe(
      libros => {
        this.libros = libros;
      }
    );

    this.txtValor.nativeElement.value = '';
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

  /*busquedaLibro(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
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

  }*/

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



  public createLibro():void{
    this._modalService.show<Libro>(NewLibroComponent,{
      title:'Crear Genero'}
    ).result()
      .subscribe(newGenero =>{
        this.libros?.push(newGenero);
      })

  }
  busquedaLibro(busqueda:string): void {
    this.libroService.busquedaLibro(busqueda)
      .subscribe(libros => {
        if (Array.isArray(libros)) {
          this.libros = libros;
        } else {
          this.libros = [libros];
        }
      }, error => {
        console.error('Error al encontrar autor:', error);
      });
  }

  busqueda(busqueda:string): void {
    this.busquedaLibro(busqueda);
  }


}











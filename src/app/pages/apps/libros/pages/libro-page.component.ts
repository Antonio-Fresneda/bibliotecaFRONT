import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { LibroService } from '../services/libro.service';
import { NewLibroComponent } from '../components/new-libro/new-libro.component';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Autor } from '../../autor/interfaces/autor';

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

  public autores:Autor[]=[]

  constructor(
    private libroService: LibroService,
    private readonly _modalService:ModalService) { }



  @ViewChild('txtValor') txtValor: any;


  ngOnInit(): void {
   this.busquedaInicial();
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

  public createLibro():void{
    this._modalService.show<Libro>(NewLibroComponent,{
      title:'Crear Libro'}
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
        console.error('Error al encontrar libro:', error);
      });
  }

  busqueda(busqueda:string): void {
    this.busquedaLibro(busqueda);
  }


}











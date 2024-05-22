import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Rol } from '../interfaces/rol';
import { RolService } from '../services/rol.service';
import { NewRolComponent } from '../components/new-rol/new-rol.component';




@Component({
  selector: 'rol-page',
  templateUrl: 'rol-page.component.html',
  styleUrls: ['rol-page.component.css']
})

export class RolPageComponent implements OnInit {

  active = 1;

  public rol: Rol[] = [];

  public rolId:Rol[] = [];

  public rolCrear:Rol[]=[];

  public rolEditar:Rol[]=[]



  constructor(
    private rolService: RolService,
    private readonly _modalService:ModalService


  ) { }
  @ViewChild('txtValor') txtValor: any;

  ngOnInit(): void {
    this.rolService.searchRol().subscribe(
      rol => {
      this.rol = rol;
    }
  );

}
  busquedaInicial(): void {
  this.rolService.searchRol().subscribe(
    rol => {
      this.rol = rol;
    }
  );

  this.txtValor.nativeElement.value = '';
  }
/*
  searchByGeneroId(term:string){
    this.generoService.searchGeneroById(term).subscribe(generoId => {
      if (Array.isArray(generoId)) {
        this.generoId = this.generoId;
      } else {
        this.generoId = [generoId];
      }
    });
  }
  /*
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
  }*/
  /*
  searchGeneros(nombre?: string, descripcion?: string, edadRecomendada?: string, urlWikipedia?: string,direccion?:string): void {
    this.generoService.busquedaDinamica(nombre, descripcion, edadRecomendada,urlWikipedia,direccion)
      .subscribe(generosFiltros => {
        if(Array.isArray(generosFiltros)){
        this.generos = generosFiltros;
      } else {
        this.generos = [generosFiltros];
      }

    });
  }

  emitValue(nombre?: string, descripcion?: string, edadRecomendada?: string, urlWikipedia?: string,direccion?:string): void {
    this.searchGeneros(nombre, descripcion, edadRecomendada,urlWikipedia,direccion);
  }


  searchGenerosNombre(nombre?: string): void {
    this.generoService.busquedaDinamica(nombre)
      .subscribe(generosFiltros => {
        if(Array.isArray(generosFiltros)){
        this.generos = generosFiltros;
      } else {
        this.generos = [generosFiltros];
      }

    });
  }

  emitValueNombre(nombre?: string): void {
    this.searchGenerosNombre(nombre);
  }

  /*busquedaGenero(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.generoService.busquedaGenero(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize)
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
  */
 /*
  busquedaGenero(busqueda:string): void {
    this.generoService.busquedaGenero(busqueda)
      .subscribe(generos => {
        if (Array.isArray(generos)) {
          this.generos = generos;
        } else {
          this.generos = [generos];
        }
      }, error => {
        console.error('Error al encontrar autor:', error);
      });
  }

  busqueda(busqueda:string): void {
    this.busquedaGenero(busqueda);
  }
  */
  public createRol():void{
    this._modalService.show<Rol>(NewRolComponent,{
      title:'Crear Rol'}
    ).result()
      .subscribe(newRol =>{
        this.rol?.push(newRol);
      })

  }






}











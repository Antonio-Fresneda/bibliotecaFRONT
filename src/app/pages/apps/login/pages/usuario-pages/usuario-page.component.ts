import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';
import { NewUsuarioComponent } from '../../components/new-usuario/new-usuario.component';
import { EditUsuarioComponent } from '../../components/edit-usuario/edit-usuario.component';



@Component({
  selector: 'usuario-page',
  templateUrl: 'usuario-page.component.html',
  styleUrls: ['usuario-page.component.css']
})

export class UsuarioPageComponent implements OnInit {

  active = 1;

  public usuarios: Usuario[] = [];

  public usuarioId:Usuario[] = [];

  public usuarioCrear:Usuario[]=[];

  public usuarioEditar:Usuario[]=[]



  constructor(
    private usuarioService: LoginService,
    private readonly _modalService:ModalService


  ) { }
  @ViewChild('txtValor') txtValor: any;

  ngOnInit(): void {
    this.usuarioService.searchUsuario().subscribe(
    usuarios => {
      this.usuarios = usuarios;
    }
  );

}
  busquedaInicial(): void {
  this.usuarioService.searchUsuario().subscribe(
    usuarios => {
      this.usuarios = usuarios;
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
  public createUsuario():void{
    this._modalService.show<Usuario>(NewUsuarioComponent,{
      title:'Crear Usuario'}
    ).result()
      .subscribe(newUsuario =>{
        this.usuarios?.push(newUsuario);
      })

  }








}











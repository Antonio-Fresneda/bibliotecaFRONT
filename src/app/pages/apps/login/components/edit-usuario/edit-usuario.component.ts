import { Component, OnInit} from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../interfaces/usuario';
import { RolService } from '../../../rol/services/rol.service';
import { Rol } from '../../../rol/interfaces/rol';

@Component({
  selector: 'edit-usuario',
  templateUrl: 'edit-usuario.component.html'
})

export class EditUsuarioComponent implements OnInit{

  public usuarioEditar:Usuario[]=[];

  public usuario:Usuario={} as Usuario;

  public rolSeleccionado: string = '';
  public rol:Rol[]=[];



  constructor(
    private loginService:LoginService,
    private rolService:RolService,


    private readonly _modalReference:ModalReference<Usuario> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.usuario=copy;
      }
  }
  ngOnInit() {
    this.busquedaInicialRol();

  }

  busquedaInicialRol(): void {
    this.rolService.searchRol().subscribe(
      roles => {
        this.rol = roles;
      }

    );
    console.log(this.rol)
  }


  editarUsuario(term:string,email:string,clave:string,nombre:string,apellidos:string,telefono:string,fechaNacimiento:string,rol:string): void {
    this.loginService.editUser(term,email,clave,nombre,apellidos,telefono,fechaNacimiento,rol)
      .subscribe(usuarioEditar => {
        if (Array.isArray(usuarioEditar)) {
          this.usuarioEditar = usuarioEditar;
        } else {
          this.usuarioEditar = [usuarioEditar];
        }
      });
  }

  editar(term:string,email:string,clave:string,nombre:string,apellidos:string,telefono:string,fechaNacimiento:string,rol:string): void {
    this.editarUsuario(term,email,clave,nombre,apellidos,telefono,fechaNacimiento,rol);
    location.reload()
  }



}

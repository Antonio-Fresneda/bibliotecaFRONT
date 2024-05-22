import { Component, OnInit } from '@angular/core';

import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';
import { RolService } from '../../../rol/services/rol.service';
import { Rol } from '../../../rol/interfaces/rol';


@Component({
  selector: 'new-genero',
  templateUrl: 'new-usuario.component.html'
})

export class NewUsuarioComponent implements OnInit {

  public usuarioCrear:Usuario[]=[];

  public rolSeleccionado: string = '';
  public rol:Rol[]=[];

  constructor(
    private usuarioService: LoginService,
    private rolService : RolService,
    private readonly _ModalReference:ModalReference<Usuario>

  ) { }

  ngOnInit() {
    this.busquedaInicialRol();
  }

  busquedaInicialRol(): void {
    this.rolService.searchRol().subscribe(
      rol => {
        this.rol = rol;
      }

    );
  }

  crearGenero( email:string,clave:string,nombre:string,apellidos:string,telefono:string,fechaNacimiento:string,rol:string): void {
    this.usuarioService.crearUsuario(email,clave,nombre,apellidos,telefono,fechaNacimiento,rol)
      .subscribe(usuarioCrear => {
        if (Array.isArray(usuarioCrear)) {
          this.usuarioCrear = usuarioCrear;
        } else {
          this.usuarioCrear = [usuarioCrear];
        }
      }, error => {
        console.error('Error al crear genero:', error);
      });
  }

  crear(  email:string,clave:string,nombre:string,apellidos:string,telefono:string,fechaNacimiento:string,rol:string): void {
    this.crearGenero(email,clave,nombre,apellidos,telefono,fechaNacimiento,rol);
    location.reload()
  }
}

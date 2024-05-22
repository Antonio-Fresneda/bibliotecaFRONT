import { Component, OnInit} from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

import { RolService } from '../../services/rol.service';
import { Rol } from '../../interfaces/rol';
import { Permisos } from '../../interfaces/permisos';

@Component({
  selector: 'edit-rol',
  templateUrl: 'edit-rol.component.html'
})

export class EditRolComponent implements OnInit{

  public rolEditar:Rol[]=[];

  public rol:Rol={} as Rol;

  public permisosSeleccionado: { [id: string]: boolean } = {};
  public permisos:Permisos[]=[];

  public dropdownOpen = false;

  constructor(
    private rolService:RolService,

    private readonly _modalReference:ModalReference<Rol> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.rol=copy;
      }
  }
  ngOnInit() {
    this.busquedaInicialPermisos();

  }

  busquedaInicialPermisos(): void {
    this.rolService.searchPermisos().subscribe(
      permisos => {
        this.permisos = permisos;
      }

    );
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  cerrar(): void {
    this.dropdownOpen = false;
  }

  confirmSelection(term:string,nombreRol:string): void {
    const idsSeleccionados = Object.keys(this.permisosSeleccionado).filter(id => this.permisosSeleccionado[id]);
    this.editarRol(term,nombreRol, idsSeleccionados);
    location.reload();
  }

  editarRol(term:string,nombreRol:string, idsPermisos: string[]): void {
    this.rolService.editarRol(
      term,nombreRol,
      idsPermisos)
      .subscribe(rolEditar => {
        this.rolEditar = rolEditar;
      },error => {
        console.error('Error al editar rol:', error);
      }
    );

  }






}

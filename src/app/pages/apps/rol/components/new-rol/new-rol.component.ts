import { Component, Input, OnInit } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

import { AutorService } from '../../../autor/services/autor.service';
import { Autor } from '../../../autor/interfaces/autor';
import { GeneroService } from '../../../genero/services/genero.service';
import { Genero } from '../../../genero/interfaces/genero';
import { Rol } from '../../interfaces/rol';
import { Permisos } from '../../interfaces/permisos';
import { RolService } from '../../services/rol.service';


@Component({
  selector: 'new-rol',
  templateUrl: 'new-rol.component.html'
})

export class NewRolComponent implements OnInit {

  public rolCrear:Rol[]=[];

  public permisos:Permisos[]= [] ;
  public permisosSeleccionado: { [id: string]: boolean } = {};

  public dropdownOpen = false;

  constructor(
    private rolService: RolService,

    private readonly _modalReference:ModalReference<Rol>

  ) { }

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

  confirmSelection(nombreRol:string): void {
    const idsSeleccionados = Object.keys(this.permisosSeleccionado).filter(id => this.permisosSeleccionado[id]);
    this.crearRol(nombreRol, idsSeleccionados);
  }

  crearRol(nombreRol:string, idsPermisos: string[]): void {
    this.rolService.crearRol(
      nombreRol,
      idsPermisos)
      .subscribe(rolCrear => {
        this.rolCrear = rolCrear;
      },error => {
        console.error('Error al crear rol:', error);
      }
    );
    location.reload();
  }
}

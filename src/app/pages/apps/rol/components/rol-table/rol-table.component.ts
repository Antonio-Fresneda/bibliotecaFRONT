import { Component, Input, ViewChild } from '@angular/core';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Rol } from '../../interfaces/rol';
import { EditRolComponent } from '../edit-rol/edit-rol.component';
import { DeleteRolComponent } from '../delete-rol/delete-rol.component';





@Component({
  selector: 'rol-table',
  templateUrl: 'rol-table.component.html',
})

export class RolTableComponent {

  @Input() titulo: string = '';
  @Input() columnaNombre: string = '';
  @Input() columnaPermisos: string = '';
  @Input() columnaAcciones: string = '';

  constructor(
    private readonly _modalService:ModalService,
  ){}

  @Input()
  public rol:Rol[]=[];

  public currentPage = 1;
  public pageSize = 5;

  get paginatedRol() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.rol.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  @ViewChild('txtValor') txtValor: any;



  deleteRol(rol: Rol): void {
    this._modalService.show<Rol>(DeleteRolComponent, {
      title: 'Borrar Usuario',
      model: rol,
    }).result().subscribe(borrarRol => {
      const index = this.rol?.findIndex(g => g.id === rol.id);
      if (index !== -1) {
        this.rol[index] = borrarRol;
      }
    });
  }

  editRol(rol: Rol): void {
    this._modalService.show<Rol>(EditRolComponent, {
      title: 'Editar Usuario',
      model: rol,
    }).result().subscribe(editarLibros => {
      const index = this.rol?.findIndex(g => g.id === rol.id);
      if (index !== -1) {
        this.rol[index] = editarLibros;
      }
    });
  }


}

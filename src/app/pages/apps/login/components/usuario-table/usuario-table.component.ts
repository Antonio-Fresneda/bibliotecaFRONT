import { Component, Input, ViewChild } from '@angular/core';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Usuario } from '../../interfaces/usuario';
import { DeleteUsuarioComponent } from '../delete-usuario/delete-usuario.component';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';




@Component({
  selector: 'usuario-table',
  templateUrl: 'usuario-table.component.html',
})

export class UsuarioTableComponent {

  constructor(
    private readonly _modalService:ModalService,
  ){}

  @Input()
  public usuarios:Usuario[]=[];

  public currentPage = 1;
  public pageSize = 5;

  get paginatedUsuarios() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.usuarios.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  @ViewChild('txtValor') txtValor: any;



  deleteUsuario(usuario: Usuario): void {
    this._modalService.show<Usuario>(DeleteUsuarioComponent, {
      title: 'Borrar Usuario',
      model: usuario,
    }).result().subscribe(borrarUsuario => {
      const index = this.usuarios?.findIndex(g => g.id === usuario.id);
      if (index !== -1) {
        this.usuarios[index] = borrarUsuario;
      }
    });
  }

  editUsuario(usuario: Usuario): void {
    this._modalService.show<Usuario>(EditUsuarioComponent, {
      title: 'Editar Usuario',
      model: usuario,
    }).result().subscribe(editarLibros => {
      const index = this.usuarios?.findIndex(g => g.id === usuario.id);
      if (index !== -1) {
        this.usuarios[index] = editarLibros;
      }
    });
  }

}

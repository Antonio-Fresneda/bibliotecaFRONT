import { Component, Input, ViewChild } from '@angular/core';
import { Biblioteca } from '../../interfaces/biblioteca';
import { DeleteBibliotecaComponent } from '../delete-biblio/delete-biblio.component';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { EditBibliotecaComponent } from '../edit-biblioteca/edit-biblio.component';

@Component({
  selector: 'biblioteca-table',
  templateUrl: 'biblioteca-table.component.html'
})

export class BibliotecaTableComponent {


  constructor(
    private readonly _modalService:ModalService,
  ){}

  @Input()
  public bibliotecas:Biblioteca[]=[];

  @ViewChild('txtValor') txtValor: any;

  public currentPage = 1;
  public pageSize = 5;

  get paginatedBibliotecas() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.bibliotecas.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  deleteBiblioteca(biblioteca: Biblioteca): void {
    this._modalService.show<Biblioteca>(DeleteBibliotecaComponent, {
      title: 'Borrar Biblioteca',
      model: biblioteca,
    }).result().subscribe(borrarBiblioteca => {
      const index = this.bibliotecas?.findIndex(g => g.id === biblioteca.id);
      if (index !== -1) {
        this.bibliotecas[index] = borrarBiblioteca;
      }
    });
  }
  editBiblioteca(biblioteca: Biblioteca): void {
    this._modalService.show<Biblioteca>(EditBibliotecaComponent, {
      title: 'Editar Biblioteca',
      model: biblioteca,
    }).result().subscribe(editarBiblioteca => {
      const index = this.bibliotecas?.findIndex(g => g.id === biblioteca.id);
      if (index !== -1) {
        this.bibliotecas[index] = editarBiblioteca;
      }
    });
  }

}

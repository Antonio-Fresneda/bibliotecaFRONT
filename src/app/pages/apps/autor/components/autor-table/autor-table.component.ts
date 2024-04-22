import { Component, Input, ViewChild } from '@angular/core';
import { Autor } from '../../interfaces/autor';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { EditAutorComponent } from '../edit-autor/edit-autor.component';
import { DeleteAutorComponent } from '../delete-autor/delete-autor.component';

@Component({
  selector: 'autor-table',
  templateUrl: 'autor-table.component.html'

})

export class AutorTableComponent {

  constructor(
    private readonly _modalService:ModalService,
  ){}

  @ViewChild('txtValor') txtValor: any;

  @Input()
  public autores:Autor[]=[];

  public currentPage = 1;
  public pageSize = 5;

  get paginatedAutores() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.autores.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  editAutor(autor: Autor): void {
    this._modalService.show<Autor>(EditAutorComponent, {
      title: 'Editar Autor',
      model: autor,
    }).result().subscribe(editarAutor => {
      const index = this.autores?.findIndex(g => g.id === autor.id);
      if (index !== -1) {
        this.autores[index] = editarAutor;
      }
    });
  }

  deleteAutor(autor: Autor): void {
    this._modalService.show<Autor>(DeleteAutorComponent, {
      title: 'Borrar Autor',
      model: autor,
    }).result().subscribe(borrarGenero => {
      const index = this.autores?.findIndex(g => g.id === autor.id);
      if (index !== -1) {
        this.autores[index] = borrarGenero;
      }
    });
  }

}

import { Component, Input, ViewChild } from '@angular/core';
import { Libro } from '../../interfaces/libro';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { DeleteLibroComponent } from '../delete-libro/delete-libro.component';
import { EditLibroComponent } from '../edit-libro/edit-libro.component';

@Component({
  selector: 'libro-table',
  templateUrl: 'libro-table.component.html'
})

export class LibroTableComponent {

  constructor(
    private readonly _modalService:ModalService,
  ){}


  @Input()
  public libros:Libro[]=[];

  public currentPage = 1;
  public pageSize = 5;

  @ViewChild('txtValor') txtValor: any;

  get paginatedLibros() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.libros.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  deleteLibro(libro: Libro): void {
    this._modalService.show<Libro>(DeleteLibroComponent, {
      title: 'Borrar Autor',
      model: libro,
    }).result().subscribe(borrarLibro => {
      const index = this.libros?.findIndex(g => g.id === libro.id);
      if (index !== -1) {
        this.libros[index] = borrarLibro;
      }
    });
  }
  editLibro(libro: Libro): void {
    this._modalService.show<Libro>(EditLibroComponent, {
      title: 'Editar Libro',
      model: libro,
    }).result().subscribe(editarLibros => {
      const index = this.libros?.findIndex(g => g.id === libro.id);
      if (index !== -1) {
        this.libros[index] = editarLibros;
      }
    });
  }

}

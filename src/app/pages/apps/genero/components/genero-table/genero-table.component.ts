import { Component, Input, ViewChild } from '@angular/core';
import { Genero } from '../../interfaces/genero';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { NewGeneroComponent } from '../new-genero/new-genero.component';
import { DeleteGeneroComponent } from '../delete-genero/delete-genero.component';
import { EditGeneroComponent } from '../edit-genero/edit-genero.component';



@Component({
  selector: 'genero-table',
  templateUrl: 'genero-table.component.html',
})

export class GeneroTableComponent {

  constructor(
    private readonly _modalService:ModalService,
  ){}

  @Input()
  public generos:Genero[]=[];

  public currentPage = 1;
  public pageSize = 5;

  get paginatedGeneros() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.generos.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  @ViewChild('txtValor') txtValor: any;

  editGenero(genero: Genero): void {
    this._modalService.show<Genero>(EditGeneroComponent, {
      title: 'Editar Genero',
      model: genero,
    }).result().subscribe(editarGenero => {
      const index = this.generos?.findIndex(g => g.id === genero.id);
      if (index !== -1) {
        this.generos[index] = editarGenero;
      }
    });
  }

  deleteGenero(genero: Genero): void {
    this._modalService.show<Genero>(DeleteGeneroComponent, {
      title: 'Borrar Genero',
      model: genero,
    }).result().subscribe(borrarGenero => {
      const index = this.generos?.findIndex(g => g.id === genero.id);
      if (index !== -1) {
        this.generos[index] = borrarGenero;
      }
    });
  }

}

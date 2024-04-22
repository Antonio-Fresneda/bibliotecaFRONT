import { Component, OnInit,Input} from '@angular/core';
import { GeneroService } from '../../services/genero.service';
import { Genero } from '../../interfaces/genero';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { GeneroModule } from '../../genero.module';

@Component({
  selector: 'edit-genero',
  templateUrl: 'edit-genero.component.html'
})

export class EditGeneroComponent {

  public generoEditar:Genero[]=[];

  public genero:Genero={} as Genero;


  constructor(
    private generoService: GeneroService,
    private readonly _modalReference:ModalReference<Genero> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.genero=copy;
      }

  }

  editarGenero(term: number, nombre: string, descripcion: string, edadRecomendada: string, urlWikipedia: string): void {
    this.generoService.editarGenero(term,nombre,descripcion,edadRecomendada,urlWikipedia)
      .subscribe(generoEditar => {
        if (Array.isArray(generoEditar)) {
          this.generoEditar = generoEditar;
        } else {
          this.generoEditar = [generoEditar];
        }
      });
  }

  editar(term: number, nombre: string, descripcion: string, edadRecomendada: string, urlWikipedia: string): void {
    this.editarGenero(term,nombre,descripcion,edadRecomendada,urlWikipedia);
    location.reload()
  }


}

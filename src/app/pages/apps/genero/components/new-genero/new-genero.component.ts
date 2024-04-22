import { Component, OnInit } from '@angular/core';
import { GeneroService } from '../../services/genero.service';
import { Genero } from '../../interfaces/genero';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { GeneroModule } from '../../genero.module';

@Component({
  selector: 'new-genero',
  templateUrl: 'new-genero.component.html'
})

export class NewGeneroComponent implements OnInit {

  public generoCrear:Genero[]=[];

  constructor(
    private generoService: GeneroService,
    private readonly _ModalReference:ModalReference<Genero>

  ) { }

  ngOnInit() { }

  crearGenero( nombre: string, descripcion: string, edadRecomendada: string, urlWikipedia: string): void {
    this.generoService.crearGenero(nombre,descripcion,edadRecomendada,urlWikipedia)
      .subscribe(generoCrear => {
        if (Array.isArray(generoCrear)) {
          this.generoCrear = generoCrear;
        } else {
          this.generoCrear = [generoCrear];
        }
      }, error => {
        console.error('Error al crear genero:', error);
      });
  }

  crear( nombre: string, descripcion: string, edadRecomendada: string, urlWikipedia: string): void {
    this.crearGenero(nombre,descripcion,edadRecomendada,urlWikipedia);
    console.log(nombre,descripcion,edadRecomendada,urlWikipedia),
    location.reload()
  }
}

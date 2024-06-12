import { Component, OnInit, ViewChild } from '@angular/core';

import { GeneroService } from '../services/genero.service';
import { Genero } from '../interfaces/genero';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { NewGeneroComponent } from '../components/new-genero/new-genero.component';
import { DialogService } from '../../error/dialog.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'genero-page',
  templateUrl: 'genero-page.component.html',
  styleUrls: ['genero-page.component.css']
})

export class GeneroPageComponent implements OnInit {

  active = 1;

  public generos: Genero[] = [];

  public generoId:Genero[] = [];

  public generoCrear:Genero[]=[];

  public generoEditar:Genero[]=[]

  public generosFiltros:Genero[]=[]

  public generosBusqueda:Genero[]=[]

  private translateSubscription: Subscription | null = null;;

  constructor(
    private generoService: GeneroService,
    private readonly _modalService:ModalService,
    private dialogService: DialogService,
    private translate: TranslateService,


  ) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
 }

  /*switchLanguage(language: string) {
    this.translate.use(language);
  }*/


  @ViewChild('txtValor') txtValor: any;

  ngOnInit(): void {
    this.generoService.searchGenero().subscribe(
      generos => {
        this.generos = generos;
      }, error => {
        if (error.status === 403) {
          this.dialogService.openErrorDialog('Error 403 Forbidden: No tienes acceso a este recurso.');
        }
      }
    );


    this.translateSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateTranslations();
    });

    this.updateTranslations();
  }
  ngOnDestroy(): void {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  private updateTranslations() {

  }

  busquedaInicial(): void {
    this.generoService.searchGenero().subscribe(
      generos => {
        this.generos = generos;
      }
    );

    this.txtValor.nativeElement.value = '';
  }

  searchByGeneroId(term:string){
    this.generoService.searchGeneroById(term).subscribe(generoId => {
      if (Array.isArray(generoId)) {
        this.generoId = this.generoId;
      } else {
        this.generoId = [generoId];
      }
    });
  }

  searchGeneros(nombre?: string, descripcion?: string, edadRecomendada?: string, urlWikipedia?: string,direccion?:string): void {
    this.generoService.busquedaDinamica(nombre, descripcion, edadRecomendada,urlWikipedia,direccion)
      .subscribe(generosFiltros => {
        if(Array.isArray(generosFiltros)){
        this.generos = generosFiltros;
      } else {
        this.generos = [generosFiltros];
      }

    });
  }

  emitValue(nombre?: string, descripcion?: string, edadRecomendada?: string, urlWikipedia?: string,direccion?:string): void {
    this.searchGeneros(nombre, descripcion, edadRecomendada,urlWikipedia,direccion);
  }


  searchGenerosNombre(nombre?: string): void {
    this.generoService.busquedaDinamica(nombre)
      .subscribe(generosFiltros => {
        if(Array.isArray(generosFiltros)){
        this.generos = generosFiltros;
      } else {
        this.generos = [generosFiltros];
      }

    });
  }

  emitValueNombre(nombre?: string): void {
    this.searchGenerosNombre(nombre);
  }

  busquedaGenero(busqueda:string): void {
    this.generoService.busquedaGenero(busqueda)
      .subscribe(generos => {
        if (Array.isArray(generos)) {
          this.generos = generos;
        } else {
          this.generos = [generos];
        }
      }, error => {
        console.error('Error al encontrar autor:', error);
      });
  }

  busqueda(busqueda:string): void {
    this.busquedaGenero(busqueda);
  }

  public createGenero():void{
    this._modalService.show<Genero>(NewGeneroComponent,{
      title:'Crear Genero'}
    ).result()
      .subscribe(newGenero =>{
        this.generos?.push(newGenero);
      })

  }





}











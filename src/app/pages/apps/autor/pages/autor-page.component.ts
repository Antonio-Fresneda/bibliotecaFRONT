import { Component, OnInit, ViewChild } from '@angular/core';
import { Autor } from '../interfaces/autor';
import { AutorService } from '../services/autor.service';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { NewAutorComponent } from '../components/new-autor/new-autor.component';
import { DialogService } from '../../error/dialog.service';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'autor-page',
  templateUrl: 'autor-page.component.html',
  styleUrls: ['autor-page.component.css']
})

export class AutorPageComponent implements OnInit {

  active = 1;


  public autores: Autor[] = [];

  public autoresId:Autor[] = [];

  public autoresFiltros:Autor[] = [];

  public autoresEditar:Autor[]=[]

  public autoresCrear:Autor[]=[]

  public autoresBusqueda:Autor[]=[]

  private translateSubscription: Subscription | null = null;

  constructor(
    private autorService: AutorService,
    private readonly _modalService:ModalService,
    private dialogService: DialogService,
    private translate: TranslateService,
  ) { }


  ngOnInit(): void {
    this.autorService.searchAutor().subscribe(
      autores => {
        this.autores = autores;

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

  private updateTranslations() {
    this.autores = [...this.autores];
  }

  @ViewChild('txtValor') txtValor: any;

  busquedaInicial(): void {
    this.autorService.searchAutor().subscribe(
      autores => {
        this.autores = autores;
      }

    );


    if (this.txtValor && this.txtValor.nativeElement) {
      this.txtValor.nativeElement.value = '';
    }
  }


  searchByAutorId(term:string){
    this.autorService.searchAutorById(term).subscribe(autoresId => {
      if (Array.isArray(autoresId)) {
        this.autoresId = this.autoresId;
      } else {
        this.autoresId = [autoresId];
      }
    });
  }

  deletedByAutorId(term:number){
    this.autorService.deleteAutorById(term).subscribe(autoresId => {
      if (Array.isArray(autoresId)) {
        this.autoresId = autoresId;
      } else {
        this.autoresId = [autoresId];
      }
      location.reload()
    });
  }

  searchAutores(nombre?: string, fechaNacimiento?: string, nacionalidad?: string,direccion?:string): void {
    this.autorService.busquedaDinamica(nombre, fechaNacimiento, nacionalidad,direccion)
      .subscribe(autoresFiltros => {
        if(Array.isArray(autoresFiltros)){
        this.autoresFiltros = autoresFiltros;
      } else {
        this.autoresFiltros = [autoresFiltros];
      }
      console.log(autoresFiltros)
    });


  }
  emitValue(nombre?: string, fechaNacimiento?: string, nacionalidad?: string,direccion?:string): void {
    this.searchAutores(nombre, fechaNacimiento, nacionalidad,direccion);
    console.log(nombre, fechaNacimiento, nacionalidad,direccion);
  }

  busquedaAutor(busqueda:string): void {
    this.autorService.busquedaAutor(busqueda)
      .subscribe(autores => {
        if (Array.isArray(autores)) {
          this.autores = autores;
        } else {
          this.autores = [autores];
        }
      }, error => {
        console.error('Error al encontrar autor:', error);
      });
  }

  busqueda(busqueda:string): void {
    this.busquedaAutor(busqueda);
  }

  public createAutor():void{
    this._modalService.show<Autor>(NewAutorComponent,{
      title:'Crear Autor'}
    ).result()
      .subscribe(newAutor =>{
        this.autores?.push(newAutor);
      })

  }

}









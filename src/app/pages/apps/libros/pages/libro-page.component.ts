import { Component, OnInit, ViewChild } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { LibroService } from '../services/libro.service';
import { NewLibroComponent } from '../components/new-libro/new-libro.component';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Autor } from '../../autor/interfaces/autor';
import { DialogService } from '../../error/dialog.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'libro-page',
  templateUrl: 'libro-page.component.html',
  styleUrls: ['libro-page.component.css']

})

export class LibroPageComponent implements OnInit {

  public libros: Libro[] = [];
  public librosBusqueda:Libro[]=[]
  public librosCrear:Libro[]=[];

  private translateSubscription: Subscription | null = null;;

  constructor(
    private libroService: LibroService,
    private readonly _modalService:ModalService,
    private dialogService: DialogService,
    private translate :TranslateService
  ) { }

  @ViewChild('txtValor') txtValor: any;
  ngOnInit(): void {
   this.busquedaInicial();
   this.translateSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.updateTranslations();
  });

  this.updateTranslations();
}

private updateTranslations() {
  this.libros = [...this.libros];
}
  public createLibro():void{
    this._modalService.show<Libro>(NewLibroComponent,{
      title:'Crear Libro'
    }
    ).result()
      .subscribe(newGenero =>{
        this.libros?.push(newGenero);
      })

  }

  busquedaInicial(): void {
    this.libroService.searchLibro().subscribe(
      libros => {
        this.libros = libros;

      } ,
      error => {
        if (error.status === 403) {
          this.dialogService.openErrorDialog('Error 403 Forbidden: No tienes acceso a este recurso.');
        }
      }
    );

    if (this.txtValor && this.txtValor.nativeElement) {
      this.txtValor.nativeElement.value = '';
    }
  }



  busquedaLibro(busqueda:string): void {
    this.libroService.busquedaLibro(busqueda)
      .subscribe(libros => {
        if (Array.isArray(libros)) {
          this.libros = libros;
        } else {
          this.libros = [libros];
        }
      }, error => {
        console.error('Error al encontrar libro:', error);
      });
  }

  busqueda(busqueda:string): void {
    this.busquedaLibro(busqueda);
  }



}











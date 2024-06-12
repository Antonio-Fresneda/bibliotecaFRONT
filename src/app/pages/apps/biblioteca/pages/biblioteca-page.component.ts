import { Component, OnInit, ViewChild } from '@angular/core';
import { BibliotecaService } from '../services/biblioteca.service';
import { Biblioteca } from '../interfaces/biblioteca';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { NewBibliotecaComponent } from '../components/new-biblioteca/new-biblioteca.component';
import { DialogService } from '../../error/dialog.service';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'biblioteca-page',
  templateUrl: 'biblioteca-page.component.html',
  styleUrls: ['biblioteca-page.component.css']
})

export class BiblitoecaPageComponent implements OnInit {

  active=2;

  public bibliotecas: Biblioteca[] = [];

  public bibliotecaId:Biblioteca[] = [];

  public bibliotecaCrear:Biblioteca[] = [];

  public bibliotecaEditar:Biblioteca[] = [];

  public bibliotecaFiltros:Biblioteca[] = [];

  public bibliotecaBusqueda:Biblioteca[] = [];

  private translateSubscription: Subscription | null = null;;


  constructor(
    private bibliotecaService: BibliotecaService,
    private readonly _modalService:ModalService,
    private dialogService: DialogService,
    private translate :TranslateService
  ) { }


  ngOnInit(): void {
    this.busquedaInicial();

    this.translateSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateTranslations();
    });

    this.updateTranslations();
  }

  private updateTranslations() {
    this.bibliotecas = [...this.bibliotecas];
  }

  @ViewChild('txtValor') txtValor: any;

  busquedaInicial(): void {
    this.bibliotecaService.searchBiblioteca().subscribe(
      bibliotecas => {
        this.bibliotecas = bibliotecas;
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

  searchByBibliotecaId(term:string){
    this.bibliotecaService.searchBibliotecaById(term).subscribe(bibliotecaId => {
      if (Array.isArray(bibliotecaId)) {
        this.bibliotecaId = this.bibliotecaId;
      } else {
        this.bibliotecaId = [bibliotecaId];
      }
    });
  }
  deleteByBibliotecaId(term:string){
    this.bibliotecaService.deleteBibliotecaById(term).subscribe(bibliotecaId => {
      if (Array.isArray(bibliotecaId)) {
        this.bibliotecaId = bibliotecaId;
      } else {
        this.bibliotecaId = [bibliotecaId];
      }
      location.reload()
    });
  }
  /*
  editarBiblioteca(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.bibliotecaService.editarBiblioteca(
      term,nombreBiblioteca,direccion,telefono,email,sitioWeb,
      idLibro,titulo,anoPublicacion,isbn,
      idAutor,nombreAutor,fechaNacimiento,nacionalidad,
      idGenero,nombre,descripcion,edadRecomendada,urlWikipedia)

      .subscribe(bibliotecaEditar => {
        if (Array.isArray(bibliotecaEditar)) {
          this.bibliotecaEditar = bibliotecaEditar;
        } else {
          this.bibliotecaEditar = [bibliotecaEditar];
        }
      }, error => {
        console.error('Error al editar:', error);
      });
  }

  editar(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): void {
    this.editarBiblioteca(term,nombreBiblioteca,direccion,telefono,email,sitioWeb,
      idLibro,titulo,anoPublicacion,isbn,
      idAutor,nombreAutor,fechaNacimiento,nacionalidad,
      idGenero,nombre,descripcion,edadRecomendada,urlWikipedia);
    location.reload()
  }
  */
  searchBibliteca(nombre:string,direccion:string,telefono:string,email:string,sitioWeb:string,order:string): void {
    this.bibliotecaService.busquedaDinamica(nombre, direccion,telefono,email, sitioWeb,order)
      .subscribe(bibliotecaFiltros => {
        if(Array.isArray(bibliotecaFiltros)){
        this.bibliotecaFiltros = bibliotecaFiltros;
      } else {
        this.bibliotecaFiltros = [bibliotecaFiltros];
      }
    });
  }

  emitValue(nombre:string,direccion:string,telefono:string,email:string,sitioWeb:string,order:string): void {
    this.searchBibliteca(nombre, direccion,telefono,email, sitioWeb,order);
    console.log(nombre, direccion,telefono,email, sitioWeb,order);
  }

  /*busquedaBiblioteca(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.bibliotecaService.busquedaBiblioteca(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize)
      .subscribe(bibliotecaBusqueda => {
        if (Array.isArray(bibliotecaBusqueda)) {
          this.bibliotecaBusqueda = bibliotecaBusqueda;
        } else {
          this.bibliotecaBusqueda = [bibliotecaBusqueda];
        }
      }, error => {
        console.error('Error al encontrar el biblioteca:', error);
      });
  }

  busqueda(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): void {
    this.busquedaBiblioteca(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);
    console.log(sortBy,valueSortOrder,key,operation,value,pageIndex,pageSize);

  }
  */
  busquedaAutor(busqueda:string): void {
    this.bibliotecaService.busquedaBiblioteca(busqueda)
      .subscribe(bibliotecas => {
        if (Array.isArray(bibliotecas)) {
          this.bibliotecas = bibliotecas;
        } else {
          this.bibliotecas = [bibliotecas];
        }
      }, error => {
        console.error('Error al encontrar autor:', error);
      });
  }

  busqueda(busqueda:string): void {
    this.busquedaAutor(busqueda);
  }

  public createBiblio():void{
    this._modalService.show<Biblioteca>(NewBibliotecaComponent,{
      title:'Crear Biblioteca',

    }
    ).result()
      .subscribe(newBiblioteca =>{
        this.bibliotecas?.push(newBiblioteca);
      })

  }

}











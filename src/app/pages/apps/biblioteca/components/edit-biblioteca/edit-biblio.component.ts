import { Component,OnInit} from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Biblioteca } from '../../interfaces/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../../libros/interfaces/libro';
import { LibroService } from '../../../libros/services/libro.service';


@Component({
  selector: 'edit-biblio',
  templateUrl: 'edit-biblio.component.html'
})

export class EditBibliotecaComponent implements OnInit{

  public bibliotecaEditar:Biblioteca[]=[];

  public biblioteca:Biblioteca={} as Biblioteca;

  public libroSeleccionado: { [id: string]: boolean } = {};
  public libros:Libro[]=[];

  public dropdownOpen = false;

  constructor(
    private bibliotecaService:BibliotecaService,
    private libroService:LibroService,
    private readonly _modalReference:ModalReference<Biblioteca> ) {
      if(this._modalReference.config.model){
        let copy={...this._modalReference.config.model};
        this.biblioteca=copy;
      }
  }
  ngOnInit() {
    this.busquedaInicialLibro();

  }
  busquedaInicialLibro(): void {
    this.libroService.searchLibro().subscribe(
      libros => {
        this.libros = libros;
      }
    );
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  cerrar(): void {
    this.dropdownOpen = false;
  }

  confirmSelection(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string): void {
    const idsSeleccionados = Object.keys(this.libroSeleccionado).filter(id => this.libroSeleccionado[id]);
    this.editarBiblioteca( term,nombreBiblioteca,direccion,telefono,email,sitioWeb,idsSeleccionados);
    location.reload();
  }

  editarBiblioteca(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string, idsLibro: string[]): void {
    this.bibliotecaService.editarBiblioteca(
      term,nombreBiblioteca,direccion,telefono,email,sitioWeb,
      idsLibro)
      .subscribe(bibliotecaEditar => {
        this.bibliotecaEditar = bibliotecaEditar;
      },error => {
        console.error('Error al editar rol:', error);
      }

    );


  }






}

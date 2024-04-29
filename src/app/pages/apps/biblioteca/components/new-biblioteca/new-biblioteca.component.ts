import { Component, OnInit } from '@angular/core';

import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { Biblioteca } from '../../interfaces/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';
import { LibroService } from '../../../libros/services/libro.service';
import { Libro } from '../../../libros/interfaces/libro';



@Component({
  selector: 'new-autor',
  templateUrl: 'new-biblioteca.component.html'
})

export class NewBibliotecaComponent implements OnInit {

  public bibliotecasCrear: Biblioteca[] = [];
  public librosSeleccionados: string[] = [];
  public libros: Libro[] = [];
  public libroSeleccionado: { [id: string]: boolean } = {};
  public dropdownOpen = false;

  public nombreBiblioteca: string = ''; // Define estas propiedades
  public direccion: string = '';
  public telefono: string = '';
  public email: string = '';
  public sitioWeb: string = '';

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }




  constructor(
    private bibliotecaService: BibliotecaService,
    private libroService:LibroService,
    private readonly _ModalReference:ModalReference<Biblioteca>

  ) { }
  ngOnInit(): void {
    this.busquedaInicialLibro();
  }
  busquedaInicialLibro(): void {
    this.libroService.searchLibro().subscribe(
      libros => {
        this.libros = libros;
      }

    );
    console.log(this.libros)
  }


  crearBiblioteca(nombreBiblioteca: string, direccion: string, telefono: string, email: string, sitioWeb: string, idsLibros: string[]): void {
    this.bibliotecaService.crearBiblioteca(
      nombreBiblioteca, direccion, telefono, email, sitioWeb,
      idsLibros
    ).subscribe(bibliotecasCrear => {
      this.bibliotecasCrear = bibliotecasCrear; // Suponiendo que tienes una variable para almacenar las bibliotecas creadas
    }, error => {
      console.error('Error al crear:', error);
    });
  }

  crear(nombreBiblioteca: string, direccion: string, telefono: string, email: string, sitioWeb: string, idsLibros: string[]): void {
    this.crearBiblioteca(nombreBiblioteca, direccion, telefono, email, sitioWeb, idsLibros);
    location.reload(); // Recargar la página después de crear la biblioteca (considera si hay una mejor manera de manejar esto)
  }

  confirmSelection(): void {
    const idsSeleccionados = Object.keys(this.libroSeleccionado).filter(id => this.libroSeleccionado[id]);
    this.crear(this.nombreBiblioteca, this.direccion, this.telefono, this.email, this.sitioWeb, idsSeleccionados);
    this.dropdownOpen = false; // Cerrar el dropdown después de confirmar la selección
  }





}

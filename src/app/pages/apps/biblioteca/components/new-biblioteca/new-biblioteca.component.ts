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

  public libros: Libro[] = [];
  public libroSeleccionado: { [id: string]: boolean } = {};

  public dropdownOpen = false;

  constructor(
    private bibliotecaService: BibliotecaService,
    private libroService: LibroService,
    private readonly _ModalReference: ModalReference<Biblioteca>
  ) { }

  ngOnInit(): void {
    this.busquedaInicialLibro();
  }

  private token: string = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjb3JyZW9AZWplbXBsby5jb20iLCJleHAiOjE3MTU3Njk5NTh9.Xjurjd2ksEdba7IN0IcdDpzfJOp8y7REDmFtK8Rl5rlMfAywE_0rv77Cyyhc934K';

  busquedaInicialLibro(): void {
    this.libroService.searchLibro().subscribe(
      libros => {
        this.libros = libros;
        console.log(this.libros);
      },
      error => {
        console.error(error);
      }
    );
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  cerrar(): void {
    this.dropdownOpen = false;
  }
  confirmSelection(nombreBiblioteca: string, direccion: string, telefono: string, email: string, sitioWeb: string): void {
    const idsSeleccionados = Object.keys(this.libroSeleccionado).filter(id => this.libroSeleccionado[id]);
    this.crearBiblioteca(nombreBiblioteca, direccion, telefono, email, sitioWeb, idsSeleccionados);
  }

  crearBiblioteca(nombreBiblioteca: string, direccion: string, telefono: string, email: string, sitioWeb: string, idsLibros: string[]): void {
    this.bibliotecaService.crearBiblioteca(
      nombreBiblioteca, direccion, telefono, email, sitioWeb,
      idsLibros)
      .subscribe(bibliotecasCrear => {
        this.bibliotecasCrear = bibliotecasCrear;
      },error => {
        console.error('Error al crear biblioteca:', error);
      }
    );
    location.reload();
  }

}

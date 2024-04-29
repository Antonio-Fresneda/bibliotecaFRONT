import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BibliotecaService } from '../apps/biblioteca/services/biblioteca.service';
import { LibroService } from '../apps/libros/services/libro.service';
import { GeneroService } from '../apps/genero/services/genero.service';
import { AutorService } from '../apps/autor/services/autor.service';



@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit,OnInit {
  subtitle: string;

  @ViewChild('barChart') barChart!: ElementRef;

  public numeroDeLibrosDisponibles: number= 0 ;
  public numeroDeGenerosDisponibles: number = 0 ;
  public numeroDeBibliotecasDisponibles: number = 0 ;
  public numeroDeAutoresDisponibles: number = 0 ;

  constructor(
    private bibliotecaService: BibliotecaService,
    private librosService:LibroService,
    private generoService:GeneroService,
    private autorService:AutorService
  ) {
    this.subtitle = 'This is some text within a card block.';

  }

  ngAfterViewInit() {}




  ngOnInit(): void {
    this.obtenerNumeroDeLibrosDisponibles();
    this.obtenerNumeroDeGenerosDisponibles();
    this.obtenerNumeroDeBibliotecasDisponibles();
    this.obtenerNumeroDeAutoresDisponibles();
  }

  obtenerNumeroDeLibrosDisponibles(): void {
    this.librosService.contarLibros().subscribe(
      (numero: number) => {
        this.numeroDeLibrosDisponibles = numero;
        console.log(this.numeroDeLibrosDisponibles);
      },
      (error) => {
        console.error('Error al obtener el número de libros disponibles:', error);
        // Manejar el error según sea necesario
      }
    );
  }
  obtenerNumeroDeGenerosDisponibles(): void {
    this.generoService.contarGeneros().subscribe(
      (numero: number) => {
        this.numeroDeGenerosDisponibles = numero;
        console.log(this.numeroDeGenerosDisponibles);
      },
      (error) => {
        console.error('Error al obtener el número de libros disponibles:', error);
        // Manejar el error según sea necesario
      }
    );
  }
  obtenerNumeroDeBibliotecasDisponibles(): void {
    this.bibliotecaService.contarBibliotecas().subscribe(
      (numero: number) => {
        this.numeroDeBibliotecasDisponibles = numero;
        console.log(this.numeroDeBibliotecasDisponibles);
      },
      (error) => {
        console.error('Error al obtener el número de libros disponibles:', error);
        // Manejar el error según sea necesario
      }
    );
  }

  obtenerNumeroDeAutoresDisponibles(): void {
    this.autorService.contarAutores().subscribe(
      (numero: number) => {
        this.numeroDeAutoresDisponibles = numero;
        console.log(this.numeroDeAutoresDisponibles);
      },
      (error) => {
        console.error('Error al obtener el número de libros disponibles:', error);
        // Manejar el error según sea necesario
      }
    );
  }





}

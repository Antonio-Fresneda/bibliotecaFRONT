import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BibliotecaService } from '../apps/biblioteca/services/biblioteca.service';
import { LibroService } from '../apps/libros/services/libro.service';
import { GeneroService } from '../apps/genero/services/genero.service';
import { AutorService } from '../apps/autor/services/autor.service';
import { Chart, registerables } from 'chart.js';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef;

  public numeroDeLibrosDisponibles: number = 0;
  public numeroDeGenerosDisponibles: number = 0;
  public numeroDeBibliotecasDisponibles: number = 0;
  public numeroDeAutoresDisponibles: number = 0;

  constructor(
    private bibliotecaService: BibliotecaService,
    private librosService: LibroService,
    private generoService: GeneroService,
    private autorService: AutorService
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.obtenerNumeroDeLibrosDisponibles();
    this.obtenerNumeroDeGenerosDisponibles();
    this.obtenerNumeroDeBibliotecasDisponibles();
    this.obtenerNumeroDeAutoresDisponibles();
  }

  obtenerNumeroDeLibrosDisponibles(): void {
    this.librosService.contarLibros().subscribe(
      (numero: number) => {
        this.numeroDeLibrosDisponibles = numero;
        this.actualizarGrafico();
      },
      (error) => {
        console.error('Error al obtener el número de libros disponibles:', error);
      }
    );
  }

  obtenerNumeroDeGenerosDisponibles(): void {
    this.generoService.contarGeneros().subscribe(
      (numero: number) => {
        this.numeroDeGenerosDisponibles = numero;
        this.actualizarGrafico();
      },
      (error) => {
        console.error('Error al obtener el número de generos disponibles:', error);
      }
    );
  }

  obtenerNumeroDeBibliotecasDisponibles(): void {
    this.bibliotecaService.contarBibliotecas().subscribe(
      (numero: number) => {
        this.numeroDeBibliotecasDisponibles = numero;
        this.actualizarGrafico();
      },
      (error) => {
        console.error('Error al obtener el número de bibliotecas disponibles:', error);
      }
    );
  }

  obtenerNumeroDeAutoresDisponibles(): void {
    this.autorService.contarAutores().subscribe(
      (numero: number) => {
        this.numeroDeAutoresDisponibles = numero;
        this.actualizarGrafico();
      },
      (error) => {
        console.error('Error al obtener el número de autores disponibles:', error);
      }
    );
  }

  actualizarGrafico(): void {
    if (
      this.numeroDeLibrosDisponibles !== 0 &&
      this.numeroDeGenerosDisponibles !== 0 &&
      this.numeroDeBibliotecasDisponibles !== 0 &&
      this.numeroDeAutoresDisponibles !== 0 &&
      this.barChart
    ) {
      this.drawBarChart();
    }
  }

  drawBarChart(): void {
    const ctx = this.barChart.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Libros', 'Géneros', 'Autores', 'Bibliotecas'],
        datasets: [{
          label: 'Cantidad Disponible',
          data: [this.numeroDeLibrosDisponibles, this.numeroDeGenerosDisponibles, this.numeroDeAutoresDisponibles, this.numeroDeBibliotecasDisponibles],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

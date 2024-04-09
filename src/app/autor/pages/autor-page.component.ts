import { Component, OnInit } from '@angular/core';
import { Autor } from '../interfaces/autor';
import { AutorService } from '../services/autor.service';

@Component({
  selector: 'autor-page',
  templateUrl: 'autor-page.component.html'
})

export class AutorPageComponent implements OnInit {
  public autores: Autor[] = [];

  public autoresId:Autor[] = [];

  public autoresFiltros:Autor[] = [];

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.autorService.searchAutor().subscribe(
      autores => {
        this.autores = autores;
      }
    );
  }
  searchByAutorId(term:string){
    this.autorService.searchAutorById(term).subscribe(autoresId => {
      if (Array.isArray(autoresId)) {
        this.autoresId = autoresId;
      } else {
        this.autoresId = [autoresId];
      }
    });
  }
  searchAutores(nombre?: string, fechaNacimiento?: string, nacionalidad?: string): void {
    this.autorService.busquedaDinamica(nombre, fechaNacimiento, nacionalidad)
      .subscribe((autoresFiltros: Autor[]) => { // Asegúrate de especificar el tipo de datos recibidos
        this.autoresFiltros = autoresFiltros;
      });
}

  emitValue(nombre?: string, fechaNacimiento?: string, nacionalidad?: string): void {
    this.searchAutores(nombre, fechaNacimiento, nacionalidad);
  }
}





import { Component, OnInit } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'libro-page',
  templateUrl: 'libro-page.component.html'
})

export class LibroPageComponent implements OnInit {

  public libros: Libro[] = [];

  constructor(private libroService: LibroService) { }


  ngOnInit(): void {
    this.libroService.searchLibro().subscribe(
      libros => {
        this.libros = libros;
      }
    );
  }

}











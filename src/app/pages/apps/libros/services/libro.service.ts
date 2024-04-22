import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';

@Injectable({providedIn: 'root'})
export class LibroService {

  private apiUrl:string='http://localhost:8081/libro'

  constructor(private http: HttpClient) { }

  searchLibro( ): Observable<Libro[]> {

    const url = this.apiUrl;
    return this.http.get<Libro[]>( url )
  }

  searchLibroById(term:string): Observable<Libro[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.get<Libro[]>( url )
  }

  deleteLibroById(term:number): Observable<Libro[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.delete<Libro[]>( url )

  }

  busquedaDinamica(titulo?:string,anoPublicacion?:string,isbn?:string,direccion?:string): Observable<Libro[]> {

    const url = `${ this.apiUrl }/libros?titulo=${titulo}&anoPublicacion=${anoPublicacion}&isbn=${isbn}&direccion=${direccion}`;
    return this.http.get<Libro[]>( url )
  }

  /*busquedaLibro(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): Observable<Libro[]> {
    const url = `${ this.apiUrl }/buscar-libros`
    const body = {
      "listOrderCriteria": [
        {
          "sortBy": sortBy,
          "valueSortOrder": valueSortOrder
        }
      ],
      "listSearchCriteria": [
        {
          "key": key,
          "operation": operation,
          "value": value
        }
      ],
      "page": {
        "pageIndex": pageIndex,
        "pageSize": pageSize
      }
    }
    return this.http.post<Libro[]>(url, body);
  }*/

  crearLibro(titulo:string,anoPublicacion:string,isbn:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Libro[]> {
    const body = {
      "titulo": titulo,
      "anoPublicacion": anoPublicacion,
      "isbn": isbn,
      "autor": {
        "nombre": nombreAutor ,
        "fechaNacimiento": fechaNacimiento,
        "nacionalidad": nacionalidad,
      },
      "genero": {
        "nombre": nombre,
        "descripcion": descripcion,
        "edadRecomendada": edadRecomendada,
        "urlWikipedia": urlWikipedia,
      }
    }
    return this.http.post<Libro[]>(this.apiUrl, body);

  }

  editarLibro(term:number,titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGenero:string): Observable<Libro[]> {
    const url = `${ this.apiUrl }/${ term }`;
    const body = {
      "id": term,
      "titulo": titulo,
      "anoPublicacion": anoPublicacion,
      "isbn": isbn,
      "autor": {
        "id": idAutor
      },
      "genero": {
        "id": idGenero,
      }
    }
    return this.http.put<Libro[]>(url, body);

  }
  busquedaLibro(busqueda:string): Observable<Libro[]> {
    const url = `${ this.apiUrl }/buscar-libros`
    const body ={
      "listOrderCriteria": [
        {
          "sortBy": "id",
          "valueSortOrder": "asc"
        }
      ],
      "listSearchCriteria": [
        {
          "key": "titulo",
          "operation": "CONTAINS",
          "value": busqueda
        },
    {
          "key": "anoPublicacion",
          "operation": "CONTAINS",
          "value": busqueda
        },
    {
          "key": "isbn",
          "operation": "CONTAINS",
          "value": busqueda
        }
      ],
      "page": {
        "pageIndex": 0,
        "pageSize":10
      }
    }
    return this.http.post<Libro[]>(url, body);
  }



}

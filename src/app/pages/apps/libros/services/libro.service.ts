import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';

@Injectable({providedIn: 'root'})
export class LibroService {

  private apiUrl:string='http://localhost:8081/libro'

  constructor(private http: HttpClient) { }

  searchLibro(): Observable<Libro[]> {
    const url = this.apiUrl;
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Libro[]>(url);
  }

  contarLibros( ): Observable<number> {

    const url = this.apiUrl + '/count';
    return this.http.get<number>( url )
  }

  searchLibroById(term:string): Observable<Libro[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.get<Libro[]>( url )
  }

  deleteLibroById(term:string): Observable<Libro[]> {

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

  crearLibro(titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGeneros:string[]): Observable<Libro[]> {

    const generos = idGeneros.map(id => ({ id }));

    const body = {
      "titulo": titulo,
      "anoPublicacion": anoPublicacion,
      "isbn": isbn,
      "autor": {
        "id": idAutor
      },
      "generos": generos
    }
    return this.http.post<Libro[]>(this.apiUrl, body);

  }

  editarLibro(term:string,titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGeneros:string[]): Observable<Libro[]> {
    const url = `${ this.apiUrl }/${ term }`;
    const generos = idGeneros.map(id => ({ id }));

    const body = {
      "id": term,
      "titulo": titulo,
      "anoPublicacion": anoPublicacion,
      "isbn": isbn,
      "autor": {
        "id": idAutor
      },
      "generos": generos
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

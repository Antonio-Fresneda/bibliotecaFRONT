import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';
import { LoginService } from '../../login/services/login.service';

@Injectable({providedIn: 'root'})
export class LibroService {

  private apiUrl:string='http://localhost:8081/libro'

  constructor(private http: HttpClient,private loginService:LoginService) { }

  searchLibro(): Observable<Libro[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = this.apiUrl;
    return this.http.get<Libro[]>(url,{headers});
  }

  deleteLibroById(term:string): Observable<Libro[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${ this.apiUrl }/${ term }`;
    return this.http.delete<Libro[]>( url,{headers} )

  }
  crearLibro(titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGeneros:string[]): Observable<Libro[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
    return this.http.post<Libro[]>(this.apiUrl, body,{headers});

  }

  editarLibro(term:string,titulo:string,anoPublicacion:string,isbn:string,idAutor:string,idGeneros:string[]): Observable<Libro[]> {
    const url = `${ this.apiUrl }/${ term }`;
    const generos = idGeneros.map(id => ({ id }));
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
    return this.http.put<Libro[]>(url, body,{headers});

  }
  busquedaLibro(busqueda:string): Observable<Libro[]> {
    const url = `${ this.apiUrl }/buscar-libros`
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

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
    return this.http.post<Libro[]>(url, body,{headers});
  }
  contarLibros( ): Observable<number> {
    const url = this.apiUrl + '/count';
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<number>( url,{headers} )
  }

  searchLibroById(term:string): Observable<Libro[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.get<Libro[]>( url )
  }

  busquedaDinamica(titulo?:string,anoPublicacion?:string,isbn?:string,direccion?:string): Observable<Libro[]> {

    const url = `${ this.apiUrl }/libros?titulo=${titulo}&anoPublicacion=${anoPublicacion}&isbn=${isbn}&direccion=${direccion}`;
    return this.http.get<Libro[]>( url )
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Autor } from '../interfaces/autor';
import { catchError, Observable, of, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AutorService {

  private apiUrl: string = 'http://localhost:8081/autor'

  constructor(private http: HttpClient) { }

  searchAutor( ): Observable<Autor[]> {

    const url = this.apiUrl;
    return this.http.get<Autor[]>( url )
  }

  searchAutorById(term:string): Observable<Autor[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.get<Autor[]>( url )
  }

  deleteAutorById(term:string): Observable<Autor[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.delete<Autor[]>( url )
  }

  busquedaDinamica(nombre?:string,fechaNacimiento?:string,nacionalidad?:string,direccion?:string): Observable<Autor[]> {

    const url = `${ this.apiUrl }/autores?nombre=${nombre}&?fechaNacimiento=${fechaNacimiento}&nacionalidad=${nacionalidad}&direccion=${direccion}`;
    return this.http.get<Autor[]>( url )
  }

  editarAutor(term:string,nombre?:string,fechaNacimiento?:string,nacionalidad?:string): Observable<Autor[]> {

    const url = `${ this.apiUrl }/${ term }`
    const body= {
      "id": 0,
      "nombre": nombre,
      "fechaNacimiento":fechaNacimiento ,
      "nacionalidad": nacionalidad
    };
    return this.http.put<Autor[]>( url,body )
  }

  crearAutor(term: string, nombre: string, fechaNacimiento: string, nacionalidad: string): Observable<Autor[]> {
    const body = {
      "id": term,
      "nombre": nombre,
      "fechaNacimiento": fechaNacimiento,
      "nacionalidad": nacionalidad
    };
    return this.http.post<Autor[]>(this.apiUrl, body);
  }

  busquedaAutor(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): Observable<Autor[]> {
    const url = `${ this.apiUrl }/buscar-autores`
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
    return this.http.post<Autor[]>(url, body);
  }




}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../interfaces/genero';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GeneroService {

  private apiUrl:string='http://localhost:8081/genero'

  constructor(private http: HttpClient) { }

  searchGenero( ): Observable<Genero[]> {

    const url = this.apiUrl;
    return this.http.get<Genero[]>( url )
  }

  searchGeneroById(term:string): Observable<Genero[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.get<Genero[]>( url )
  }

  deleteGeneroById(term:string): Observable<Genero[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.delete<Genero[]>( url )

  }

  crearGenero(term: string, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Genero[]> {
    const body = {
      "id": term,
      "nombre": nombre,
      "descripcion": descripcion,
      "edadRecomendada": edadRecomendada,
      "urlWikipedia": urlWikipedia,
    };
    return this.http.post<Genero[]>(this.apiUrl, body);
  }

  editarGenero(term: string, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Genero[]> {

    const url = `${ this.apiUrl }/${ term }`
    const body = {
      "id": term,
      "nombre": nombre,
      "descripcion": descripcion,
      "edadRecomendada": edadRecomendada,
      "urlWikipedia": urlWikipedia,
    };
    return this.http.put<Genero[]>( url,body )
  }

  busquedaDinamica(nombre?:string,descripcion?:string,edadRecomendada?:string,urlWikipedia?:string,direccion?:string): Observable<Genero[]> {

    const url = `${ this.apiUrl }/generos?nombre=${nombre}&?descripcion=${descripcion}&edadRecomendada=${edadRecomendada}&urlWikipedia=${urlWikipedia}&direccion=${direccion}`;
    return this.http.get<Genero[]>( url )
  }

  busquedaAutor(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): Observable<Genero[]> {
    const url = `${ this.apiUrl }/buscar-generos`
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
    return this.http.post<Genero[]>(url, body);
  }

}

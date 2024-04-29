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

  contarGeneros( ): Observable<number> {

    const url = this.apiUrl + '/count';
    return this.http.get<number>( url )
  }

  searchGeneroById(term:string): Observable<Genero[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.get<Genero[]>( url )
  }

  deleteGeneroById(term:number): Observable<Genero[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.delete<Genero[]>( url )

  }

  crearGenero( nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Genero[]> {
    const body = {
      "nombre": nombre,
      "descripcion": descripcion,
      "edadRecomendada": edadRecomendada,
      "urlWikipedia": urlWikipedia,
    };
    return this.http.post<Genero[]>(this.apiUrl, body);
  }

  editarGenero(term: number, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Genero[]> {

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

  /*busquedaGenero(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): Observable<Genero[]> {
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
  */
  busquedaGenero(busqueda:string): Observable<Genero[]> {
    const url = `${ this.apiUrl }/buscar-generos`
    const body = {
      "listOrderCriteria": [
        {
          "sortBy": "id",
          "valueSortOrder": "asc"
        }
      ],
      "listSearchCriteria": [
        {
          "key": "nombre",
          "operation": "CONTAINS",
          "value": busqueda
        },
    {
          "key": "descripcion",
          "operation": "CONTAINS",
          "value": busqueda
        },
    {
          "key": "edadRecomendada",
          "operation": "CONTAINS",
          "value": busqueda
        },
    {
          "key": "urlWikipedia",
          "operation": "CONTAINS",
          "value": busqueda
        }
      ],
      "page": {
        "pageIndex": 0,
        "pageSize":10
      }
    }
    return this.http.post<Genero[]>(url, body);
  }


}

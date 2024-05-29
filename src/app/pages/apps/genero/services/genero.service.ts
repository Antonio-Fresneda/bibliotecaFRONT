import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Genero } from '../interfaces/genero';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/services/login.service';

@Injectable({providedIn: 'root'})
export class GeneroService {

  private apiUrl:string='http://localhost:8081/genero'

  constructor(private http: HttpClient,private loginService: LoginService) { }

  /*searchGenero( ): Observable<Genero[]> {

    const url = this.apiUrl;
    return this.http.get<Genero[]>( url )
  }
  */
  searchGenero(): Observable<Genero[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = this.apiUrl;

    return this.http.get<Genero[]>(url, { headers });
  }

  contarGeneros( ): Observable<number> {
    const url = this.apiUrl + '/count';
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<number>( url,{headers} );
  }

  searchGeneroById(term:string): Observable<Genero[]> {

    const url = `${ this.apiUrl }/${ term }`;
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Genero[]>( url,{headers} )
  }

  deleteGeneroById(term:number): Observable<Genero[]> {

    const url = `${ this.apiUrl }/${ term }`;
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Genero[]>( url,{headers} )

  }

  crearGenero( nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Genero[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      "nombre": nombre,
      "descripcion": descripcion,
      "edadRecomendada": edadRecomendada,
      "urlWikipedia": urlWikipedia,
    };
    return this.http.post<Genero[]>(this.apiUrl, body,{headers});
  }

  editarGenero(term: number, nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Genero[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${ this.apiUrl }/${ term }`
    const body = {
      "id": term,
      "nombre": nombre,
      "descripcion": descripcion,
      "edadRecomendada": edadRecomendada,
      "urlWikipedia": urlWikipedia,
    };
    return this.http.put<Genero[]>( url,body,{headers} )
  }

  busquedaDinamica(nombre?:string,descripcion?:string,edadRecomendada?:string,urlWikipedia?:string,direccion?:string): Observable<Genero[]> {

    const url = `${ this.apiUrl }/generos?nombre=${nombre}&?descripcion=${descripcion}&edadRecomendada=${edadRecomendada}&urlWikipedia=${urlWikipedia}&direccion=${direccion}`;
    return this.http.get<Genero[]>( url )
  }

  busquedaGenero(busqueda:string): Observable<Genero[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
    return this.http.post<Genero[]>(url, body,{headers});
  }


}

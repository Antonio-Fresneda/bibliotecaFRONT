import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Biblioteca } from '../interfaces/biblioteca';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/services/login.service';

@Injectable({providedIn: 'root'})
export class BibliotecaService {

  private apiUrl:string='http://localhost:8081/biblioteca'

  constructor(
    private http: HttpClient,
    private loginService:LoginService
  ) { }

  searchBiblioteca( ): Observable<Biblioteca[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = this.apiUrl;
    return this.http.get<Biblioteca[]>( url,{headers} )
  }

  contarBibliotecas( ): Observable<number> {
    const url = this.apiUrl + '/count';
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<number>( url,{headers} )
  }
  searchBibliotecaById(term:string): Observable<Biblioteca[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${ this.apiUrl }/${ term }`;

    return this.http.get<Biblioteca[]>( url,{headers})
  }

  deleteBibliotecaById(term:string): Observable<Biblioteca[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${ this.apiUrl }/${ term }`;

    return this.http.delete<Biblioteca[]>( url,{headers} )

  }

  crearBiblioteca(nombreBiblioteca: string, direccion: string, telefono: string, email: string, sitioWeb: string, idsLibros: string[]): Observable<Biblioteca[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const libros = idsLibros.map(id => ({ id }));

    const body = {
      "nombre": nombreBiblioteca,
      "direccion": direccion,
      "telefono": telefono,
      "email": email,
      "sitioWeb": sitioWeb,
      "libros": libros
    };

    return this.http.post<Biblioteca[]>(this.apiUrl, body,{headers});
  }

  editarBiblioteca(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,idLibros:string[]): Observable<Biblioteca[]> {
    const libros = idLibros.map(id => ({ id }));
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${ this.apiUrl }/${ term }`
    const body = {
      "id": term,
      "nombre": nombreBiblioteca,
      "direccion": direccion,
      "telefono": telefono,
      "email": email,
      "sitioWeb": sitioWeb,
      "libros": libros
  }
    return this.http.put<Biblioteca[]>(url, body,{headers});

  }

  busquedaDinamica(nombre:string,direccion:string,telefono:string,email:string,sitioWeb:string,order:string): Observable<Biblioteca[]> {

    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${ this.apiUrl }/filtros?nombre=${nombre}&?direccion=${direccion}&telefono=${telefono}&email=${email}&sitioWeb=${sitioWeb}&order=${order}`;

    return this.http.get<Biblioteca[]>( url,{headers})
  }

  busquedaBiblioteca(busqueda:string): Observable<Biblioteca[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${ this.apiUrl }/buscar-bibliotecas`
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
          "key": "direccion",
          "operation": "CONTAINS",
          "value": busqueda
        },
        {
          "key": "telefono",
          "operation": "CONTAINS",
          "value": busqueda
        },
        {
          "key": "email",
          "operation": "CONTAINS",
          "value": busqueda
        },{
          "key": "sitioWeb",
          "operation": "CONTAINS",
          "value": busqueda
        }
      ],
      "page": {
        "pageIndex": 0,
        "pageSize": 10
      }
    }
    return this.http.post<Biblioteca[]>(url, body,{headers});
  }


}

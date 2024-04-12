import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Biblioteca } from '../interfaces/biblioteca';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BibliotecaService {

  private apiUrl:string='http://localhost:8081/biblioteca'

  constructor(private http: HttpClient) { }

  searchBiblioteca( ): Observable<Biblioteca[]> {

    const url = this.apiUrl;
    return this.http.get<Biblioteca[]>( url )
  }

  searchBibliotecaById(term:string): Observable<Biblioteca[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.get<Biblioteca[]>( url )
  }

  deleteBibliotecaById(term:string): Observable<Biblioteca[]> {

    const url = `${ this.apiUrl }/${ term }`;
    return this.http.delete<Biblioteca[]>( url )

  }

  crearBiblioteca(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Biblioteca[]> {

    const body = {
      "id":term,
      "nombre": nombreBiblioteca,
      "direccion": direccion,
      "telefono": telefono,
      "email": email,
      "sitioWeb": sitioWeb,
      "libros": [
        {
          "id": idLibro,
          "titulo":titulo ,
          "anoPublicacion":anoPublicacion ,
          "isbn": isbn,
          "autor": {
            "id": idAutor,
            "nombre": nombreAutor,
            "fechaNacimiento": fechaNacimiento,
            "nacionalidad": nacionalidad
          },
          "genero": {
            "id": idGenero,
            "nombre": nombre,
            "descripcion":descripcion,
            "edadRecomendada": edadRecomendada,
            "urlWikipedia": urlWikipedia
          }
        }
      ]
    }
    return this.http.post<Biblioteca[]>(this.apiUrl, body);

  }

  editarBiblioteca(term:string,nombreBiblioteca:string,direccion:string,telefono:string,email:string,sitioWeb:string,
    idLibro:string,titulo:string,anoPublicacion:string,isbn:string,
    idAutor:string,nombreAutor:string,fechaNacimiento:string,nacionalidad:string,
    idGenero:string,nombre: string, descripcion: string,edadRecomendada: string, urlWikipedia: string): Observable<Biblioteca[]> {

    const url = `${ this.apiUrl }/${ term }`
    const body = {
      "id":term,
      "nombre": nombreBiblioteca,
      "direccion": direccion,
      "telefono": telefono,
      "email": email,
      "sitioWeb": sitioWeb,
      "libros": [
        {
          "id": idLibro,
          "titulo":titulo ,
          "anoPublicacion":anoPublicacion ,
          "isbn": isbn,
          "autor": {
            "id": idAutor,
            "nombre": nombreAutor,
            "fechaNacimiento": fechaNacimiento,
            "nacionalidad": nacionalidad
          },
          "genero": {
            "id": idGenero,
            "nombre": nombre,
            "descripcion":descripcion,
            "edadRecomendada": edadRecomendada,
            "urlWikipedia": urlWikipedia
          }
        }
      ]
    }
    return this.http.put<Biblioteca[]>(url, body);

  }
  busquedaDinamica(nombre:string,direccion:string,telefono:string,email:string,sitioWeb:string,order:string): Observable<Biblioteca[]> {

    const url = `${ this.apiUrl }/filtros?nombre=${nombre}&?direccion=${direccion}&telefono=${telefono}&email=${email}&sitioWeb=${sitioWeb}&order=${order}`;
    return this.http.get<Biblioteca[]>( url )
  }

  busquedaBiblioteca(sortBy: string, valueSortOrder: string, key: string, operation: string,value:string,pageIndex:string,pageSize:string): Observable<Biblioteca[]> {
    const url = `${ this.apiUrl }/buscar-bibliotecas`
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
    return this.http.post<Biblioteca[]>(url, body);
  }


}

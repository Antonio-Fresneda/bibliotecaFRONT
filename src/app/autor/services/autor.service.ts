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
  busquedaDinamica(nombre?:string,fechaNacimiento?:string,nacionalidad?:string): Observable<Autor[]> {

    const url = `${ this.apiUrl }/autores?nombre=${nombre}&?fechaNacimiento=${fechaNacimiento}&nacionalidad=${nacionalidad}`;
    return this.http.get<Autor[]>( url )
  }


}

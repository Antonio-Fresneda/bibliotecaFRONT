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


}

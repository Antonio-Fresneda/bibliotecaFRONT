import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/rol';
import { Permisos } from '../interfaces/permisos';


@Injectable({providedIn: 'root'})
export class RolService {

  private apiUrl:string='http://localhost:8081/rol'

  constructor(private http: HttpClient) { }

  searchRol( ): Observable<Rol[]> {

    const url = this.apiUrl;

    return this.http.get<Rol[]>( url )
  }

  searchPermisos( ): Observable<Permisos[]> {

    const url = 'http://localhost:8081/permisos';

    return this.http.get<Permisos[]>( url )
  }

  crearRol(nombreRol:string,idPermisos:string[]): Observable<Rol[]> {

    const permisos = idPermisos.map(id => ({ id }));

    const body = {
      "nombreRol": nombreRol,
      "permisos": permisos
    }
    return this.http.post<Rol[]>(this.apiUrl, body);

  }

  editarRol(term:string,nombreRol:string,idPermisos:string[]): Observable<Rol[]> {
    const url = `${ this.apiUrl }/${ term }`;
    const permisos = idPermisos.map(id => ({ id }));

    const body = {
      "id":term,
      "nombreRol": nombreRol,
      "permisos": permisos
    }
    return this.http.put<Rol[]>(url, body);

  }

  deleteRolById(term:string): Observable<Rol[]> {

    const url = `${ this.apiUrl }/${ term }`;

    return this.http.delete<Rol[]>( url )

  }




}


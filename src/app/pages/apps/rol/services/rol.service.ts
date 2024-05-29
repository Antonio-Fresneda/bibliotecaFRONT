import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/rol';
import { Permisos } from '../interfaces/permisos';
import { LoginService } from '../../login/services/login.service';


@Injectable({providedIn: 'root'})
export class RolService {

  private apiUrl:string='http://localhost:8081/rol'

  constructor(private http: HttpClient,private loginService:LoginService) { }

  searchRol( ): Observable<Rol[]> {

    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = this.apiUrl;

    return this.http.get<Rol[]>( url, {headers} )
  }

  searchPermisos( ): Observable<Permisos[]> {

    const url = 'http://localhost:8081/permisos';
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Permisos[]>( url,{headers} )
  }

  crearRol(nombreRol:string,idPermisos:string[]): Observable<Rol[]> {

    const permisos = idPermisos.map(id => ({ id }));
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      "nombreRol": nombreRol,
      "permisos": permisos
    }

    return this.http.post<Rol[]>(this.apiUrl, body,{headers});

  }

  editarRol(term:string,nombreRol:string,idPermisos:string[]): Observable<Rol[]> {
    const url = `${ this.apiUrl }/${ term }`;
    const permisos = idPermisos.map(id => ({ id }));
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      "id":term,
      "nombreRol": nombreRol,
      "permisos": permisos
    }
    return this.http.put<Rol[]>(url, body,{headers});

  }

  deleteRolById(term:string): Observable<Rol[]> {

    const url = `${ this.apiUrl }/${ term }`;
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Rol[]>( url,{headers} )

  }




}


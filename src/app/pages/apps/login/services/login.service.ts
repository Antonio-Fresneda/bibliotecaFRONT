import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';


@Injectable({providedIn: 'root'})
export class LoginService {

  private apiUrl:string='http://localhost:8081/usuario'

  constructor(private http: HttpClient) { }

  searchUsuario( ): Observable<Usuario[]> {

    const url = this.apiUrl;

    return this.http.get<Usuario[]>( url )
  }

  crearUsuario(email:string,clave:string,nombre:string,apellidos:string,telefono:string,fechaNacimiento:string,rol:string): Observable<Usuario[]> {
    const body ={
      "email": email,
      "clave": clave,
      "nombre": nombre,
      "apellidos":apellidos,
      "telefono": telefono,
      "fechaNacimiento": fechaNacimiento,
      "rol": rol
   }
    const url = this.apiUrl + '/crear';
    return this.http.post<Usuario[]>(url, body);
  }

  registrarUser(email:string,clave:string,nombre:string,apellidos:string,telefono:string,fechaNacimiento:string): Observable<Usuario[]> {
    const body ={
      "email": email,
      "clave": clave,
      "nombre": nombre,
      "apellidos":apellidos,
      "telefono": telefono,
      "fechaNacimiento": fechaNacimiento,
      "rol": "USUARIO"
   }
    const url = this.apiUrl + '/crear';
    return this.http.post<Usuario[]>(url, body);
  }

  login(email:string,clave:string):Observable<Usuario[]>{

    const body ={
      "email": email,
      "clave": clave,
    }
    const url = this.apiUrl + '/login';
    return this.http.post<Usuario[]>(url,body);
  }

  deleteUsuarioById(term:string): Observable<Usuario[]> {

    const url = `${ this.apiUrl }/${ term }`;

    return this.http.delete<Usuario[]>( url )

  }

  editUser(term:string,email:string,clave:string,nombre:string,apellidos:string,telefono:string,fechaNacimiento:string,rol:string):Observable<Usuario[]>{

    const body ={
      "id": term,
      "email": email,
      "clave": clave,
      "nombre": nombre,
      "apellidos": apellidos,
      "telefono": telefono,
      "fechaNacimiento": fechaNacimiento,
      "rol": rol
    }

    const url = `${ this.apiUrl }/${ term }`
    return this.http.put<Usuario[]>(url,body);
  }



}

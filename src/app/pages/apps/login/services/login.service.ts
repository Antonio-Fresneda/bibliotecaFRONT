import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl: string = 'http://localhost:8081/usuario';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLES_KEY = 'auth_roles';
  private readonly PERMISOS_KEY = 'auth_permisos';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  searchUsuario(): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    const url = this.apiUrl;
    return this.http.get<Usuario[]>(url, { headers });
  }

  crearUsuario(email: string, clave: string, nombre: string, apellidos: string, telefono: string, fechaNacimiento: string, rol: string): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    const body = { email, clave, nombre, apellidos, telefono, fechaNacimiento, rol };
    const url = `${this.apiUrl}/crear`;
    return this.http.post<Usuario[]>(url, body, { headers });
  }

  registrarUser(email: string, clave: string, nombre: string, apellidos: string, telefono: string, fechaNacimiento: string): Observable<Usuario[]> {
    const body = { email, clave, nombre, apellidos, telefono, fechaNacimiento, rol: "USUARIO" };
    const url = `${this.apiUrl}/registrar`;
    return this.http.post<Usuario[]>(url, body);
  }

  login(email: string, clave: string): Observable<any> {
    const body = { email, clave };
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, body).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          this.setRoles(response.rol);
          this.setPermisos(response.permisos);
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setRoles(roles: string): void {
    localStorage.setItem(this.ROLES_KEY, roles);
  }

  private setPermisos(permisos: string): void {
    localStorage.setItem(this.PERMISOS_KEY, permisos);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRoles(): string | null {
    return localStorage.getItem(this.ROLES_KEY);
  }

  getPermisos(): string | null {
    return localStorage.getItem(this.PERMISOS_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLES_KEY);
    localStorage.removeItem(this.PERMISOS_KEY);
  }

  deleteUsuarioById(term: string): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/${term}`;
    return this.http.delete<Usuario[]>(url, { headers });
  }

  editUser(term: string, email: string, clave: string, nombre: string, apellidos: string, telefono: string, fechaNacimiento: string, rol: string): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    const body = { id: term, email, clave, nombre, apellidos, telefono, fechaNacimiento, rol };
    const url = `${this.apiUrl}/${term}`;
    return this.http.put<Usuario[]>(url, body, { headers });
  }
}

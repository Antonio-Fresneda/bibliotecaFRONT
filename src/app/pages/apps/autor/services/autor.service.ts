import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Autor } from '../interfaces/autor';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/services/login.service';

@Injectable({ providedIn: 'root' })
export class AutorService {
  private apiUrl: string = 'http://localhost:8081/autor';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  searchAutor(): Observable<Autor[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = this.apiUrl;
    return this.http.get<Autor[]>(url, { headers });
  }

  contarAutores(): Observable<number> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = this.apiUrl + '/count';
    return this.http.get<number>(url, { headers });
  }

  searchAutorById(term: string): Observable<Autor[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${term}`;
    return this.http.get<Autor[]>(url, { headers });
  }

  deleteAutorById(term: number): Observable<Autor[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${term}`;
    return this.http.delete<Autor[]>(url, { headers });
  }

  busquedaDinamica(nombre?: string, fechaNacimiento?: string, nacionalidad?: string, direccion?: string): Observable<Autor[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/autores?nombre=${nombre}&fechaNacimiento=${fechaNacimiento}&nacionalidad=${nacionalidad}&direccion=${direccion}`;
    return this.http.get<Autor[]>(url, { headers });
  }

  editarAutor(term: number, nombre?: string, fechaNacimiento?: string, nacionalidad?: string): Observable<Autor[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${term}`;
    const body = {
      id: term,
      nombre: nombre,
      fechaNacimiento: fechaNacimiento,
      nacionalidad: nacionalidad
    };
    return this.http.put<Autor[]>(url, body, { headers });
  }

  crearAutor(nombre: string, fechaNacimiento: string, nacionalidad: string): Observable<Autor[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      nombre: nombre,
      fechaNacimiento: fechaNacimiento,
      nacionalidad: nacionalidad
    };
    return this.http.post<Autor[]>(this.apiUrl, body, { headers });
  }

  busquedaAutor(busqueda: string): Observable<Autor[]> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/buscar-autores`;
    const body = {
      listOrderCriteria: [
        {
          sortBy: 'id',
          valueSortOrder: 'asc'
        }
      ],
      listSearchCriteria: [
        {
          key: 'nombre',
          operation: 'CONTAINS',
          value: busqueda
        },
        {
          key: 'nacionalidad',
          operation: 'CONTAINS',
          value: busqueda
        }
      ],
      page: {
        pageIndex: 0,
        pageSize: 10
      }
    };
    return this.http.post<Autor[]>(url, body, { headers });
  }
}

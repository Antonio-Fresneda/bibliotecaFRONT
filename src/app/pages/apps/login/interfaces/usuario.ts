export interface Usuario {
  id: string;
  email: string;
  clave: string;
  nombre: string;
  apellidos?:string;
  telefono:string;
  fechaNacimiento:string;
  rol:string

}

export interface Libro {
  id: number;
  titulo: string;
  anoPublicacion: string;
  isbn: string;
  autorId?:number;
  generoId?:number;
}

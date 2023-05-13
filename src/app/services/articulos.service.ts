import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Articulos } from '../models/Articulos.model';
import { articuloForm } from '../interfaces/articulo-form.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  public errorMessage: any;
  constructor(private http: HttpClient) { }

  cargarArticulos():Observable<Articulos[]>{

    const url = `https://localhost:44393/api/Articulos`;
    return this.http.get<Articulos[]>(url);
  }
  cargarArticuloId(id: number):Observable<any>{

    const url = `https://localhost:44393/api/Articulos/${id}`;
    return this.http.get<any>(url);
  }
  crearArticulo( nombre: articuloForm ) {
    console.log(nombre);
    const url = `https://localhost:44393/api/Articulos`;
    this.http.post( url,{ ...nombre}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);

      return of();
  })).subscribe();
  }
  
  actualizarArticulo( _id: number|null|undefined, nombre: articuloForm  ) {

    console.log( nombre );
    const url = `https://localhost:44393/api/Articulos/${ _id }`;
    return this.http.put( url, { ...nombre });
  }

  borrarArticulo( _id: number ) {

    const url = `https://localhost:44393/api/Articulos/${ _id }`;
    return this.http.delete( url);
  }
}

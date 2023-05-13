import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Tiendas } from '../models/Tiendas.model';
import { tiendaForm } from '../interfaces/tienda-form.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  constructor(private http: HttpClient) { }

  cargarTiendas():Observable<Tiendas[]>{

    const url = `https://localhost:44393/api/Tiendas`;
    return this.http.get<Tiendas[]>(url);
  }
  cargarTiendaId(id: number):Observable<any>{

    const url = `https://localhost:44393/api/Tiendas/${id}`;
    return this.http.get<any>(url);
  }

  crearTienda( nombre: tiendaForm ) {
    console.log(nombre);
    const url = `https://localhost:44393/api/Tiendas`;
    return this.http.post( url, { ...nombre });
  }
  
  actualizarTienda( _id: number|null|undefined, nombre: tiendaForm  ) {

    const url = `https://localhost:44393/api/Tiendas/${ _id }`;
    return this.http.put( url, { ...nombre });
  }

  borrarTienda( _id: number ) {

    const url = `https://localhost:44393/api/Tiendas/${ _id }`;
    return this.http.delete( url);
  }
}

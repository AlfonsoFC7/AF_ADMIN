import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Clientes } from '../models/Clientes.model';
import { clienteForm } from '../interfaces/cliente-form.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  cargarClientes():Observable<Clientes[]>{

    const url = `https://localhost:44393/api/TbClientes`;
    return this.http.get<Clientes[]>(url);
  }

  cargarClientesId(id: number):Observable<any>{

    const url = `https://localhost:44393/api/TbClientes/${id}`;
    return this.http.get<any>(url);
  }
  crearCliente( nombre: clienteForm ) {
    const url = `https://localhost:44393/api/TbClientes`;
    return this.http.post( url, { ...nombre });
  }
  
  actualizarCliente( _id: number|undefined|null, nombre: clienteForm  ) {
    console.log(nombre);
    const url = `https://localhost:44393/api/TbClientes/${ _id }`;
    return this.http.put( url, {...nombre });
  }

  borrarCliente( _id: number ) {

    const url = `https://localhost:44393/api/TbClientes/${ _id }`;
    return this.http.delete( url);
  }
}
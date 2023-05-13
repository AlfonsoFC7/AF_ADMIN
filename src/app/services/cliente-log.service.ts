import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Clientes } from '../models/Clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteLogService {

  constructor(private http: HttpClient, 
    private router: Router,
    private ngZone: NgZone) { }

    login( formData: LoginForm ) {   
      return this.http.get(`https://localhost:44393/api/Clientes/${formData.IdCli}/`+formData.CliName )
                  .pipe();  
    }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`https://localhost:44393/api/Clientes`, formData );
  }


}

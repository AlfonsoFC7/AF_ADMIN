import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Clientes } from '../../models/Clientes.model';

import { ArticulosService } from '../../services/articulos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { Tiendas } from '../../models/Tiendas.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public fech:Date = new Date();
  public clienteForm = this.fb.group({
    idCli: [0, Validators.required ],
    cliName: ['', Validators.required ],
    idArt: 0,
    fecha: [this.fech.toLocaleString(), Validators.required ],
  });

  public clientes: any; 

  constructor( private clientesService: ClientesService,private router: Router,
    private fb: FormBuilder) { }


  ngOnInit(): void {

  }

  CrearCliente() {
      this.clientesService.crearCliente( this.clienteForm.value )
        .subscribe( (resp: any) => {
          this.clientes.push( resp.data );
        })
  }
}
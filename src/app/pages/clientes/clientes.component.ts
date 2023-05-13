  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormBuilder, Validators } from '@angular/forms';
  import { Subscription } from 'rxjs';
  import { delay } from 'rxjs/operators';
  import Swal from 'sweetalert2';
  
  import { Clientes } from '../../models/Clientes.model';
  
  import { ClientesService } from 'src/app/services/clientes.service';

  @Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
  })
  
  export class ClientesComponent implements OnInit {
    public fech:Date = new Date();
    public clienteForm = this.fb.group({
      idCli: [0, Validators.required ],
      cliName: ['', Validators.required ],
      idArt: [0, Validators.required ],
      fecha: [this.fech.toLocaleString(), Validators.required ],
    });
    public clientes: any;
    public Clintee: Clientes | undefined;
    public cargando: boolean = true;
    
  
    constructor( private clientesService: ClientesService,private router: Router,
      private fb: FormBuilder) { }
  
  
    ngOnInit(): void {
      this.cargarClientes();
      console.log(this.clientes);
    }
  
    cargarClientes() {
  
      this.cargando = true;
       this.clientesService.cargarClientes().subscribe((clientes: any) => {this.cargando = false;this.clientes=clientes});
  
    }
    cargarClientesId(id:number) {
  
      this.cargando = true;
       this.clientesService.cargarClientesId(id).subscribe((clientes: any) => {this.cargando = false;this.clienteForm.setValue(clientes);});
  
    }
  
    guardarCambios( ) {

      const {idCli} = this.clienteForm.value;
      this.clientesService.actualizarCliente( idCli, this.clienteForm.value)
          .subscribe( resp => {
            Swal.fire( 'Actualizado idCli', 'success' );
          });
  
    }
  
    eliminarCliente( cliente: number ) {
      console.log(cliente);
      this.clientesService.borrarCliente( cliente )
          .subscribe( resp => {
            this.cargarClientes();
            Swal.fire( 'Borrado', 'success' );
          });
  
    }
  
    CrearCliente() {
         this.clientesService.crearCliente( this.clienteForm.value )
           .subscribe( (resp: any) => {
             this.clientes.push( resp.data );
           })
    }
  
  
  
  }

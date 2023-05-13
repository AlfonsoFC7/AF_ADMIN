import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Tiendas } from '../../models/Tiendas.model';

import { TiendasService } from '../../services/tiendas.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})

export class TiendasComponent implements OnInit {
  public fech:Date = new Date();
  public tiendaForm = this.fb.group({
    idTie: [0, Validators.required ],
    idArt: [0, Validators.required ],
    fecha: [this.fech.toLocaleString(), Validators.required ],
    tieSucursal: ['', Validators.required ],
    tieDireccion: ['', Validators.required ]
  });
  public tiendas: any;
  public cargando: boolean = true;
  

  constructor( private tiendasService: TiendasService,private router: Router,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.cargarTiendas();
    console.log(this.tiendas);
  }

  cargarTiendas() {

    this.cargando = true;
     this.tiendasService.cargarTiendas().subscribe((tiendas: any) => {this.cargando = false;this.tiendas=tiendas});

  }
  cargarTiendaId(id:number) {
  
    this.cargando = true;
     this.tiendasService.cargarTiendaId(id).subscribe((tienda: any) => {this.cargando = false;this.tiendaForm.setValue(tienda);});

  }
  guardarCambios() {
const{idTie}= this.tiendaForm.value;
    this.tiendasService.actualizarTienda( idTie, this.tiendaForm.value )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', 'success' );
        });

  }

  eliminarTienda( tiendas: number ) {

    this.tiendasService.borrarTienda( tiendas )
        .subscribe( resp => {
          this.cargarTiendas();
          Swal.fire( 'Borrado', 'success' );
        });

  }

  CrearTienda() {
      this.tiendasService.crearTienda( this.tiendaForm.value )
        .subscribe( (resp: any) => {
          this.tiendas.push( resp.data );
        })
  }



}
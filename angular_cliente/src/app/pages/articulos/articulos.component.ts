import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Articulos } from '../../models/Articulos.model';

import { ArticulosService } from '../../services/articulos.service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { Tiendas } from '../../models/Tiendas.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})

export class ArticulosComponent implements OnInit {

  onFileChange($event:any) {
     let file = $event.target.files[0]; 
    this.articuloForm.controls['artImagen'].setValue(file ? file.name : ''); 
}

  public fech:Date = new Date();
  public articuloForm = this.fb.group({
    idArt: [0, Validators.required ],
    artName: ['', Validators.required ],
    idTie: [0, Validators.required ],
    fecha: [this.fech.toLocaleString(), Validators.required ],
    idCli: [0, Validators.required ],
    artDescripcion: ['', Validators.required ],
    artPrecio: [0, Validators.required ],
    artImagen: ['', Validators.required ],
    artStock: [0, Validators.required ]
  });
  public articulos:any;
  public tiendas: any;
  public cargando: boolean = true;
  

  constructor(private sanitizer: DomSanitizer, private tiendasService: TiendasService,private articulosService: ArticulosService,private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarArticulos();
    this.cargarTiendas();
  }

  cargarArticulos() {

    this.cargando = true;
     this.articulosService.cargarArticulos().subscribe((articulos: Articulos[]) => {this.cargando = false;this.articulos=articulos});

  }

  cargarArticuloId(id:number) {
  
    this.cargando = true;
     this.articulosService.cargarArticuloId(id).subscribe((articulos: any) => {this.cargando = false;this.articuloForm.setValue(articulos);});

  }

  cargarTiendas() {

    this.cargando = true;
     this.tiendasService.cargarTiendas().subscribe((tiendas: any) => {this.cargando = false;this.tiendas=tiendas});

  }

  guardarCambios(  ) {

    const {idArt} = this.articuloForm.value;
    this.articulosService.actualizarArticulo( idArt, this.articuloForm.value )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', 'success' );
        });

  }

  eliminarArticulo( IdArt: number ) {

    this.articulosService.borrarArticulo( IdArt )
        .subscribe( resp => {
          this.cargarArticulos();
          Swal.fire( 'Borrado', 'success' );
        });

  }

 async CrearArticulo() {
     await this.articulosService.crearArticulo( this.articuloForm.value ); 
  }

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Articulos } from 'src/app/models/Articulos.model';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { TiendasService } from 'src/app/services/tiendas.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{
  
  public articulos:any;
  public producto: any;
  public cargando: boolean = true;
  public car:any;
  public cantidad: number=0;
  public totalS: number=0;
  
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
  constructor( private tiendasService: TiendasService,private articulosService: ArticulosService,
    private fb: FormBuilder, private clientesService: ClientesService, private rutaActiva: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.car ={
      id:this.rutaActiva.snapshot.params
    };
    const{artName} = this.articuloForm.value;
    this.producto=artName;
    console.log(this.producto);
    this.cargarArticulos();

  }

  cargarArticuloId(id:number) {  
    this.cargando = true;
     this.articulosService.cargarArticuloId(id).subscribe((articulos: any) => {this.cargando = false;this.articuloForm.setValue(articulos)});
     localStorage.setItem("Clave", JSON.stringify(this.articuloForm.value));
     this.producto = localStorage.getItem("Clave");
     console.log(this.producto);
  }
  
  total(){
    let sum=0;
    if(this.articuloForm.controls['artPrecio'].value !== null){
      sum =this.cantidad*this.articuloForm.controls['artPrecio'].value;
    }
    this.totalS = sum;
    console.log(sum);
    return sum;
  }

  cargarArticulos() {

    this.cargando = true;
     this.articulosService.cargarArticulos().subscribe((articulos: Articulos[]) => {this.cargando = false;this.articulos=articulos});
  }
  upQuantity(): void{

    this.cantidad ++;
    console.log(this.cantidad);
    }
}

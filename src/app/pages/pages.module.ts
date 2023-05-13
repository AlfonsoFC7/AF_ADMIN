import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { TiendasComponent } from './tiendas/tiendas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticulosComponent } from './articulos/articulos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CarComponent } from './car/car.component';


@NgModule({
  declarations: [
    PagesComponent,
    TiendasComponent,
    ArticulosComponent,
    ClientesComponent,
    CarComponent
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class PagesModule { }

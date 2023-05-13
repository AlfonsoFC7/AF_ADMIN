import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendasComponent } from './tiendas/tiendas.component';
import { LoginComponent } from '../auth/login/login.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CarComponent } from './car/car.component';

const routes: Routes = [
  {path: 'clientes', 
  component: ClientesComponent},
      { path: 'articulos', component: ArticulosComponent, data: { titulo: 'articulos' } },
      { path: 'tiendas', component: TiendasComponent, data: { titulo: 'tiendas' }},
      { path: 'car/:id', component: CarComponent, data: { titulo: 'car' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

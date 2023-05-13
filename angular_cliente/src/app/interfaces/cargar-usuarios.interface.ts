import { Clientes } from '../models/Clientes.model';

export interface CargarUsuario {
    total: number;
    clientes: Clientes[];
}
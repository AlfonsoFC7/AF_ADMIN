import { DecimalPipe } from "@angular/common";

export class Articulos {

    constructor(
        public IdArt: number,
        public ArtName?: string,
        public IdTie?: number,
        public Fecha?: string,
        public IdCli?: number,
        public ArtDescripcion?: string,
        public ArtPrecio?: number,
        public ArtImagen?: string,
        public ArtStock?: boolean
    ) {}

}
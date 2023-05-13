using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppiTIENDA.Data
{
    public class Articulos
    {
        [Key]
        public int IdArt { get; set; }
        public string ArtName { get; set; }
        public int IdTie { get; set; }
        public string Fecha { get; set; }
        public int IdCli { get; set; }
        public string ArtDescripcion { get; set; }
        public decimal ArtPrecio { get; set; }
        public string ArtImagen { get; set; }
        public Boolean ArtStock { get; set; }
    }
}

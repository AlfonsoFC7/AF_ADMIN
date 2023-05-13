using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppiTIENDA.Data
{
    public class Tiendas
    {
        [Key]
        public int IdTie { get; set; }
        public int IdArt { get; set; }
        public string Fecha { get; set; }
        public string TieSucursal { get; set; }
        public string TieDireccion { get; set; }
    }
}

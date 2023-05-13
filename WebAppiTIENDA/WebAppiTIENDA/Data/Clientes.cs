using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppiTIENDA.Data
{
    public class Clientes
    {
        [Key]
        public int IdCli { get; set; }
        public string CliName { get; set; }
        public int IdArt { get; set; }
        public string Fecha { get; set; }
    }
}

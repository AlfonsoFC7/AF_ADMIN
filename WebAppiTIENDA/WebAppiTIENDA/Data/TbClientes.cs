using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppiTIENDA.Data
{
    public class TbClientes
    {
        [Key]
        public int IdCli { get; set; }
        public string CliName { get; set; }
        public int IdArt { get; set; }
        [StringLength(35)]
        [DisplayName("Fecha")]
        public string Fecha { get; set; }
    }
}

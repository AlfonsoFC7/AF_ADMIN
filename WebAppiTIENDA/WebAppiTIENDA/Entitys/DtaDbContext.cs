using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppiTIENDA.Data;

namespace WebAppiTIENDA.Entitys
{
    public class DtaDbContext:DbContext
    {
        public DtaDbContext(DbContextOptions<DtaDbContext> options) : base(options){ }

        public virtual DbSet<Clientes> Clientes { get; set; }
        public virtual DbSet<TbClientes> TbClientes { get; set; }
        public virtual DbSet<Articulos> Articulos { get; set; }
        public virtual DbSet<Tiendas> Tiendas { get; set; }
    }
}

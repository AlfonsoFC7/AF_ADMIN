using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppiTIENDA.Data;
using WebAppiTIENDA.Entitys;

namespace WebAppiTIENDA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TbClientesController : ControllerBase
    {
        private readonly DtaDbContext _context;

        public TbClientesController(DtaDbContext context)
        {
            _context = context;
        }

        // GET: api/TbClientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbClientes>>> GetTbClientes()
        {
            return await _context.TbClientes.FromSqlRaw($"EXEC sp_Clientes @OPC=50").ToListAsync();
        }

        // GET: api/TbClientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TbClientes>> GetTbClientes(int id)
        {
            List<TbClientes> tbClientes = new List<TbClientes>();
            tbClientes = await _context.TbClientes.FromSqlRaw($"EXEC sp_Clientes @OPC=51, @IdCli={id}").ToListAsync();

            if (tbClientes == null)
            {
                return NotFound();
            }
            TbClientes cliente = new TbClientes();
            foreach (TbClientes client in tbClientes)
            {
                cliente.IdCli = client.IdCli;
                cliente.CliName = client.CliName;
                cliente.IdArt = client.IdArt;
                cliente.Fecha = client.Fecha;
            }
            return cliente;
        }

        // PUT: api/TbClientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbClientes(int id, TbClientes tbClientes)
        {
            if (id != tbClientes.IdCli)
            {
                return BadRequest();
            }

      

            try
            {
                await _context.TbClientes.FromSqlInterpolated($"EXEC sp_Clientes @OPC=2, @IdCli={id}, @CliName={tbClientes.CliName}, @IdArt={tbClientes.IdArt}, @Fecha={tbClientes.Fecha}").ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                if (!TbClientesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TbClientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TbClientes>> PostTbClientes(TbClientes tbClientes)
        {
            await _context.Clientes.FromSqlInterpolated($"EXEC sp_Clientes @OPC=1, @IdCli={tbClientes.IdCli}, @CliName={tbClientes.CliName}, @IdArt={tbClientes.IdArt}, @Fecha={tbClientes.Fecha}").ToListAsync();

            return CreatedAtAction("GetTbClientes", new { id = tbClientes.IdCli }, tbClientes);
        }

        // DELETE: api/TbClientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbClientes(int id)
        {

            try
            {
                await _context.TbClientes.FromSqlInterpolated($"EXEC sp_Clientes @OPC=3, @IdCli={id}").ToListAsync();
            }catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return NoContent();
        }

        private bool TbClientesExists(int id)
        {
            return _context.TbClientes.Any(e => e.IdCli == id);
        }
    }
}

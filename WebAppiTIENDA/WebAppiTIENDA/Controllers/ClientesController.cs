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
    public class ClientesController : ControllerBase
    {
        private readonly DtaDbContext _context;

        public ClientesController(DtaDbContext context)
        {
            _context = context;
        }

        // GET: api/Clientes 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clientes>>> GetClientes()
        {
            return await _context.Clientes.ToListAsync();
        }

        // GET: api/Clientes/5
        [HttpGet("{id}/{name}")]
        public async Task<bool> GetClientes(int id, string name)
        {
            bool clientes = await _context.Clientes.Where(x => x.IdCli == id && x.CliName == name).Select(x => x.IdCli).AnyAsync();

            if (clientes == false)
            {
                return false;
            }

            return clientes;
        }

        //PUT: api/Clientes/5
        // To protect from overposting attacks
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClientes(int id, Clientes clientes)
        {
            if (id != clientes.IdCli)
            {
                return BadRequest();
            }

            _context.Entry(clientes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientesExists(id))
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

        // POST: api/Clientes
        // To protect from overposting attacks, see
        [HttpPost]
        public async Task<ActionResult<Clientes>> PostClientes(Clientes clientes)
        {
            await _context.Clientes.FromSqlInterpolated($"EXEC sp_Clientes @OPC=1, @IdCli={clientes.IdCli}, @CliName={clientes.CliName}, @IdArt={clientes.IdArt}, @Fecha={clientes.Fecha}").ToListAsync();

            return CreatedAtAction("GetClientes", new { id = clientes.IdCli }, clientes);
        }

        // DELETE: api/Clientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClientes(int id)
        {
            var clientes = await _context.Clientes.FindAsync(id);
            if (clientes == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(clientes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientesExists(int id)
        {
            return _context.Clientes.Any(e => e.IdCli == id);
        }
    }
}

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
    public class TiendasController : ControllerBase
    {
        private readonly DtaDbContext _context;

        public TiendasController(DtaDbContext context)
        {
            _context = context;
        }

        // GET: api/Tiendas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tiendas>>> GetTiendas()
        {
            return await _context.Tiendas.ToListAsync();
        }

        // GET: api/Tiendas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tiendas>> GetTiendas(int id)
        {
            var tiendas = await _context.Tiendas.FindAsync(id);

            if (tiendas == null)
            {
                return NotFound();
            }

            return tiendas;
        }

        // PUT: api/Tiendas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiendas(int id, Tiendas tiendas)
        {
            if (id != tiendas.IdTie)
            {
                return BadRequest();
            }

            try
            {
                await _context.Tiendas.FromSqlInterpolated($"EXEC sp_Tiendas @OPC=2, @IdTie={tiendas.IdTie}, @IdArt={tiendas.IdArt}, @Fecha={tiendas.Fecha}, @TieSucursal={tiendas.TieSucursal}, @TieDireccion={tiendas.TieDireccion}").ToListAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiendasExists(id))
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

        // POST: api/Tiendas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tiendas>> PostTiendas(Tiendas tiendas)
        {
            try
            {
                var res = await _context.Tiendas.FromSqlInterpolated($"EXEC sp_Tiendas @OPC=1, @IdTie={tiendas.IdTie}, @IdArt={tiendas.IdArt}, @Fecha={tiendas.Fecha}, @TieSucursal={tiendas.TieSucursal}, @TieDireccion={tiendas.TieDireccion}").ToListAsync();
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }
            return CreatedAtAction("GetTiendas", new { id = tiendas.IdTie }, tiendas);
        }

        // DELETE: api/Tiendas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTiendas(int id)
        {
            try
            {
                await _context.Tiendas.FromSqlInterpolated($"EXEC sp_Tiendas @OPC=3, @IdTie={id}").ToListAsync();
            }catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return NoContent();
        }

        private bool TiendasExists(int id)
        {
            return _context.Tiendas.Any(e => e.IdTie == id);
        }
    }
}

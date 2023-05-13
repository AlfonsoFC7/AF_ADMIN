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
    public class ArticulosController : ControllerBase
    {
        private readonly DtaDbContext _context;

        public ArticulosController(DtaDbContext context)
        {
            _context = context;
        }

        // GET: api/Articulos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Articulos>>> GetArticulos()
        {
            return await _context.Articulos.ToListAsync();
        }

        // GET: api/Articulos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Articulos>> GetArticulos(int id)
        {
            var articulos = await _context.Articulos.FindAsync(id);

            if (articulos == null)
            {
                return NotFound();
            }

            return articulos;
        }

        // PUT: api/Articulos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticulos(int id, Articulos articulos)
        {
            if (id != articulos.IdArt)
            {
                return BadRequest();
            }


            try
            {
                await _context.Articulos.FromSqlInterpolated($"EXEC sp_Articulos @OPC=2, @IdArt={id}, @ArtName={articulos.ArtName}, @IdTie={articulos.IdTie}, @Fecha={articulos.Fecha}, @IdCli={articulos.IdCli}, @ArtDescripcion={articulos.ArtDescripcion}, @ArtPrecio={articulos.ArtPrecio}, @ArtImagen={articulos.ArtImagen}, @ArtStock={articulos.ArtStock}").ToListAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticulosExists(id))
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

        // POST: api/Articulos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Articulos>> PostArticulos(Articulos articulos)
        {
            await _context.Articulos.FromSqlInterpolated($"EXEC sp_Articulos @OPC=1, @IdArt={articulos.IdArt}, @ArtName={articulos.ArtName}, @IdTie={articulos.IdTie}, @Fecha={articulos.Fecha}, @IdCli={articulos.IdCli}, @ArtDescripcion={articulos.ArtDescripcion}, @ArtPrecio={articulos.ArtPrecio}, @ArtImagen={articulos.ArtImagen}, @ArtStock={articulos.ArtStock}").ToListAsync();

            return CreatedAtAction("GetArticulos", new { id = articulos.IdArt }, articulos);
        }

        // DELETE: api/Articulos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticulos(int id)
        {

            try
            {
                await _context.Articulos.FromSqlInterpolated($"EXEC sp_Articulos @OPC=3, @IdArt={id}").ToListAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return NoContent();
        }

        private bool ArticulosExists(int id)
        {
            return _context.Articulos.Any(e => e.IdArt == id);
        }
    }
}

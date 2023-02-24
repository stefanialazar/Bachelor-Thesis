using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;
using System.Threading.Tasks;
using IvyLakes.Data;
using IvyLakes.DTOs;

namespace IvyLakes.Controllers
{

    [ApiController]
    public class SeriesController : Controller
    {
        private readonly MerchShopContext _context;
        public SeriesController(MerchShopContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet("api/series")]
        public async Task<IActionResult> Get()
        {
            var series = await _context.TvSeries.ToListAsync();
            return Ok(series);
        }

        [EnableQuery]
        [HttpGet("api/series/{id}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var series = await _context.TvSeries
                .FirstOrDefaultAsync(m => m.SeriesId == id);
            if (series == null)
            {
                return NotFound();
            }

            return Ok(series);
        }

    }
}

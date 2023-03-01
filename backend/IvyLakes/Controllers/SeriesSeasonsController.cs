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
    public class SeriesSeasonsController : Controller
    {
        private readonly MerchShopContext _context;

        public SeriesSeasonsController(MerchShopContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet("api/series-seasons/{id}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var seriesSeasons = await _context.SeriesSeasons.Where(s => s.SeriesId == id).ToListAsync();

            if (seriesSeasons == null)
            {
                return NotFound();
            }

            return Ok(seriesSeasons);
        }
    }
}

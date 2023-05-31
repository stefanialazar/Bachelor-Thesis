using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;
using System.Threading.Tasks;
using IvyLakes.Data;
using IvyLakes.DTOs;
using IvyLakes.Data;
using IvyLakes.DTOs;
using IvyLakes.Models;

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

        [HttpPost("api/series/add")]
        public async Task<IActionResult> AddSerie([FromBody] SeriesDTO seriesDTO)
        {

            // Retrieve the maximum SeriesID value from the existing records
            int maxSeriesID = await _context.TvSeries.MaxAsync(c => c.SeriesId);

            // Create the new series object
            var newSerie = new TvSeries
            {
                SeriesId = maxSeriesID + 1, // Set the new CommentID value
                SeriesTitle = seriesDTO.SeriesTitle,
                YearReleased = seriesDTO.YearReleased,
                ImdbRating = seriesDTO.ImdbRating,
                Genre = seriesDTO.Genre,
                Description = seriesDTO.Description,
                StreamingPlatform = seriesDTO.StreamingPlatform,
                SeriesImageUrl = seriesDTO.SeriesImageUrl
            };

            // Add the new series to the table
            _context.TvSeries.Add(newSerie);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Series added" });
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;
using IvyLakes.Data;
using IvyLakes.DTOs;
using IvyLakes.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;


namespace IvyLakes.Controllers
{
    [ApiController]
    public class SeriesSeasonsController : Controller
    {
        private readonly SeriesSyncContext _context;

        public SeriesSeasonsController(SeriesSyncContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet("api/series-seasons")]
        public async Task<IActionResult> Get()
        {
            var seriesSeasons = await _context.SeriesSeasons.ToListAsync();

            if (seriesSeasons == null)
            {
                return NotFound();
            }

            return Ok(seriesSeasons);
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

        [HttpPost("api/series-seasons/add")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddSeriesSeasons([FromBody] SeriesSeasonsDTO ssDTO)
        {

            // Find the series by title
            TvSeries series = await _context.TvSeries.FirstOrDefaultAsync(s => s.SeriesTitle == ssDTO.SeriesTitle);

            if (series == null)
            {
                return BadRequest("Series not found");
            }

            // Retrieve the maximum SeriesSeasonID value from the existing records
            int maxSSID = await _context.SeriesSeasons.MaxAsync(i => i.Id);

            // Create the new series object
            var newSS = new SeriesSeason
            {
                Id = maxSSID + 1, // Set the new SeriesSeasonID value
                SeriesId = series.SeriesId, // Set the series Id
                AiredSeason = ssDTO.AiredSeason,
                AiredEpisodes = ssDTO.AiredEpisodes
            };

            // Add the new series to the table
            _context.SeriesSeasons.Add(newSS);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Season & episodes added" });
        }
    }
}

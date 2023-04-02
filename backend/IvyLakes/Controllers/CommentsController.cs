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
    public class CommentsController : Controller
    {
        private readonly MerchShopContext _context;
        public CommentsController(MerchShopContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet("api/comments")]
        public async Task<IActionResult> Get()
        {
            var comments = await _context.Comments.ToListAsync();
            return Ok(comments);
        }

        [EnableQuery]
        [HttpGet("api/comments/{id}/season{seasonNumber}episode{episodeNumber}")]
        public async Task<IActionResult> Get([FromRoute] int? id, [FromRoute] int? seasonNumber, [FromRoute] int? episodeNumber)
        {
            if (id == null)
            {
                return NotFound();
            }

            var serieEpisodeComments = await _context.Comments.Where(s => s.SeriesID == id).Where(s => s.SeasonNumber == seasonNumber).Where(s => s.EpisodeNumber == episodeNumber).ToListAsync();

            if (serieEpisodeComments == null)
            {
                return NotFound();
            }

            return Ok(serieEpisodeComments);
        }

    }
}

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

namespace IvyLakes.Controllers { 

    [ApiController]
    public class ProductController : Controller
    {
        private readonly MerchShopContext _context;
        public ProductController(MerchShopContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet("api/images")]
        public async Task<IActionResult> Get()
        {
            var products = await _context.Images.ToListAsync();
            return Ok(products);
        }

        [EnableQuery]
        [HttpGet("api/images/{id}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var product = await _context.Images
                .FirstOrDefaultAsync(m => m.ImageId == id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost("api/images/add")]
        public async Task<IActionResult> AddImage([FromBody] ImageDTO imageDTO)
        {

            // Find the series by title
            TvSeries series = await _context.TvSeries.FirstOrDefaultAsync(s => s.SeriesTitle == imageDTO.SeriesTitle);

            if (series == null)
            {
                return BadRequest("Series not found");
            }

            // Retrieve the maximum ImageID value from the existing records
            int maxImageID = await _context.Images.MaxAsync(i => i.ImageId);

            // Create the new series object
            var newImage = new Image
            {
                ImageId = maxImageID + 1, // Set the new CommentID value
                ImageUrl = imageDTO.ImageUrl,
                SeriesId = series.SeriesId // Set the series Id

            };

            // Add the new series to the table
            _context.Images.Add(newImage);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Image added" });
        }
    }
}

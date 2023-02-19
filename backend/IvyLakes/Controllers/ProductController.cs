using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;
using System.Threading.Tasks;
using IvyLakes.Data;
using IvyLakes.DTOs;

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
                .FirstOrDefaultAsync(m => m.ImageID == id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

    }
}

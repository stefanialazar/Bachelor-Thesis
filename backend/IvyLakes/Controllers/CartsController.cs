using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using IvyLakes.Data;
using IvyLakes.DTOs;
using IvyLakes.IRepositories;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;


namespace IvyLakes.Controllers
{
    [ApiController]
    public class CartsController : Controller
    {

        private readonly ICartRepository _cartRepo;
        public CartsController(ICartRepository cartRepo, MerchShopContext context)
        {
            _cartRepo = cartRepo;
        }

        [EnableQuery]
        [HttpGet("api/cart/{userId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get([FromRoute] Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return NotFound();
            }

            var carts = await _cartRepo.GetCartsByUserId(userId);

            if (carts == null || !carts.Any())
            {
                return NotFound();
            }

            return Ok(carts);
        }

        [HttpPut("api/cart/{userId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateCart([FromRoute] Guid userId, [FromBody] CartsDTO updatedCartData)
        {
            if (userId == Guid.Empty || string.IsNullOrEmpty(updatedCartData.Merch))
            {
                return BadRequest();
            }

            var updatedCart = await _cartRepo.UpdateCart(userId, updatedCartData.Merch);

            if (updatedCart == null)
            {
                return NotFound();
            }

            return Ok(updatedCart);
        }

        [HttpPost("api/cart/add-merch")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddMerchToCart([FromBody] CartsDTO merchToAdd)
        {
            if (merchToAdd.UserId == Guid.Empty || string.IsNullOrEmpty(merchToAdd.Merch))
            {
                return BadRequest();
            }

            var updatedCart = await _cartRepo.AddMerchToCart(merchToAdd.UserId, merchToAdd.
                Merch);

            if (updatedCart == null)
            {
                return NotFound();
            }

            return Ok(updatedCart);
        }



    }
}

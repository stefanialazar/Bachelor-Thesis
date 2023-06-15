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
    public class OrdersController : Controller
    {
        private readonly SeriesSyncContext _context;
        private readonly IOrderRepository _orderRepository;

        public OrdersController(SeriesSyncContext context, IOrderRepository orderRepository)
        {
            _context = context;
            _orderRepository = orderRepository;
        }

        [EnableQuery]
        [HttpGet("api/orders/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            if (id.Equals(Guid.Empty))
            {
                return NotFound();
            }

            var userOrders = await _context.Orders.Where(o => o.UserId == id).ToListAsync();

            if (userOrders == null)
            {
                return NotFound();
            }

            return Ok(userOrders);
        }

        [HttpPost("api/orders")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddOrder([FromBody] OrdersDTO orderDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newOrder = await _orderRepository.AddOrder(orderDto.UserId, orderDto.Merch, orderDto.OrderDate);

            if (newOrder == null)
            {
                return StatusCode(500, "Error creating order");
            }

            return Ok(newOrder);
        }
    }
}

using Backend.Helpers;
using IvyLakes.DTOs;
using IvyLakes.IRepositories;
using IvyLakes.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using IvyLakes.Data;
using Microsoft.AspNetCore.Cors;
using System.Security.Claims;

namespace IvyLakes.Controllers
{
    [ApiController]
    public class UserSeriesController : Controller
    {
        private readonly MerchShopContext _context;

        public UserSeriesController( MerchShopContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [EnableCors]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("api/user-seasons")]
        public async Task<IActionResult> Get()
        {
            var seriesSeasons = await _context.UserSeries.ToListAsync();

            if (seriesSeasons == null)
            {
                return NotFound();
            }

            return Ok(seriesSeasons);
        }
    }
}

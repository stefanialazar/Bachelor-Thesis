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
        private readonly SeriesSyncContext _context;

        public UserSeriesController( SeriesSyncContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [EnableCors]
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

        [EnableQuery]
        [HttpGet("api/user-seasons/{id}")]
        public async Task<IActionResult> Get([FromRoute] int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var seriesSeasons = await _context.UserSeries.Where(s => s.SeriesId == id).ToListAsync();

            if (seriesSeasons == null)
            {
                return NotFound();
            }

            return Ok(seriesSeasons);
        }

        [HttpPost("api/user-seasons/update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateUserSeries([FromBody] UserSeriesDTO updateUserSeries)
        {
            var userId = updateUserSeries.UserId;
            if (userId == Guid.Empty)
            {
                return Unauthorized();
            }

            // Find the existing UserSeries record
            var userSeries = await _context.UserSeries
                .FirstOrDefaultAsync(us => us.SeriesId == updateUserSeries.SeriesId && us.UserId == userId);

            if (userSeries == null)
            {
                // Create a new UserSeries record
                userSeries = new UserSeries
                {
                    SeriesId = updateUserSeries.SeriesId,
                    UserId = updateUserSeries.UserId,
                    CurrentSeason = updateUserSeries.CurrentSeason,
                    CurrentEpisode = updateUserSeries.CurrentEpisode
                };

                // Add the new record to the UserSeries table
                _context.UserSeries.Add(userSeries);
            }
            else
            {
                // Update the currentSeason and currentEpisode of the existing UserSeries record
                userSeries.CurrentSeason = updateUserSeries.CurrentSeason;
                userSeries.CurrentEpisode = updateUserSeries.CurrentEpisode;
            }

            // Save the changes
            await _context.SaveChangesAsync();

            // Return the updated or newly created UserSeries record
            return Ok(userSeries);
        }



    }
}

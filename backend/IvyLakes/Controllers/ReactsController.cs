using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNet.OData;
using System.Threading.Tasks;
using IvyLakes.Data;
using IvyLakes.DTOs;
using IvyLakes.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System;

namespace IvyLakes.Controllers
{
    public class ReactsController : Controller
    {
        private readonly SeriesSyncContext _context;

        public ReactsController(SeriesSyncContext context)
        {
            _context = context;
        }

        [EnableQuery]
        [HttpGet("api/reacts/{userId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get([FromRoute] Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return NotFound();
            }

            var reacts = await _context.Reacts.Where(r => r.UserId == userId).ToListAsync();

            if (reacts == null || !reacts.Any())
            {
                return NotFound();
            }

            return Ok(reacts);
        }

        [HttpPost("api/reacts")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddReact([FromBody] ReactsDTO newCommentReact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the maximum CommentID value from the existing records
            int maxReactID = await _context.Reacts.MaxAsync(r => r.ReactId);

            var react = new Reacts
            {
                ReactId = maxReactID + 1,
                UserId = newCommentReact.UserId,
                CommentId = newCommentReact.CommentId,
                ReplyId = newCommentReact.ReplyId,
                Reaction = newCommentReact.Reaction
            };

            _context.Reacts.Add(react);
            await _context.SaveChangesAsync();

            // Return the created react along with 201 status code.
            return CreatedAtAction(nameof(Get), new { userId = react.UserId }, react);
        }
    }
}

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

        [HttpGet("api/comments/{commentId}")]
        public async Task<IActionResult> GetComment([FromRoute] int commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }


        [EnableQuery]
        [HttpGet("api/comments/{id}/season{seasonNumber}episode{episodeNumber}")]
        public async Task<IActionResult> Get([FromRoute] int? id, [FromRoute] int? seasonNumber, [FromRoute] int? episodeNumber)
        {
            if (id == null)
            {
                return NotFound();
            }

            var serieEpisodeComments = await _context.Comments
                .Include(c => c.User)
                .Where(s => s.SeriesId == id)
                .Where(s => s.SeasonNumber == seasonNumber)
                .Where(s => s.EpisodeNumber == episodeNumber)
                .Select(c => new
                {
                    c.CommentId,
                    c.UserId,
                    AuthorName = c.User.FirstName + " " + c.User.LastName,
                    c.SeriesId,
                    c.SeasonNumber,
                    c.EpisodeNumber,
                    c.CommentBody,
                    c.CommentImageUrl,
                    c.Score
                })
                .ToListAsync();

            if (serieEpisodeComments == null)
            {
                return NotFound();
            }

            return Ok(serieEpisodeComments);
        }

        [HttpPost("api/comments/create")]
        public async Task<IActionResult> CreateComment([FromBody] CommentsDTO createCommentDTO)
        {

            // Retrieve the maximum CommentID value from the existing records
            int maxCommentID = await _context.Comments.MaxAsync(c => c.CommentId);

            // Create the new comment object
            var newComment = new Comment
            {
                CommentId = maxCommentID + 1, // Set the new CommentID value
                UserId = createCommentDTO.UserId,
                SeriesId = createCommentDTO.SeriesId,
                SeasonNumber = createCommentDTO.SeasonNumber,
                EpisodeNumber = createCommentDTO.EpisodeNumber,
                CommentBody = createCommentDTO.CommentBody,
                CommentImageUrl = createCommentDTO.CommentImageURL,
                Score = 0
            };

            // Add the new comment to the table
            _context.Comments.Add(newComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComment), new { commentId = newComment.CommentId }, newComment);
        }


    }
}

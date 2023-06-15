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
    public class CommentsRepliesController : Controller
    {
        private readonly SeriesSyncContext _context;

        public CommentsRepliesController(SeriesSyncContext context)
        {
            _context = context;
        }

        [HttpGet("api/comments/{commentId}/replies")]
        public async Task<IActionResult> GetCommentReplies([FromRoute] int commentId)
        {
            var commentReplies = await _context.CommentsReplies
                .Include(r => r.User)
                .Where(r => r.CommentId == commentId)
                .Select(r => new
                {
                    r.ReplyId,
                    r.UserId,
                    AuthorName = r.User.FirstName + " " + r.User.LastName,
                    r.CommentId,
                    r.CommentBody,
                    r.CommentImageUrl,
                    r.Score,
                    r.Hidden
                })
                .ToListAsync();

            if (commentReplies == null || !commentReplies.Any())
            {
                return NotFound();
            }

            return Ok(commentReplies);
        }

        [HttpPost("api/comments/reply/create")]
        public async Task<IActionResult> CreateCommentReply([FromBody] CommentsReplyDTO createReplyDTO)
        {

            // Check if the table is empty and set the appropriate ReplyId
            int maxReplyID = await _context.CommentsReplies.AnyAsync() ? await _context.CommentsReplies.MaxAsync(r => r.ReplyId) : 0;

            // Create the new reply object
            var newReply = new CommentsReply
            {
                ReplyId = maxReplyID + 1, // Set the new ReplyID value
                UserId = createReplyDTO.UserId,
                CommentId = createReplyDTO.CommentId,
                CommentBody = createReplyDTO.CommentBody,
                CommentImageUrl = createReplyDTO.CommentImageUrl,
                Score = 0,
                Hidden = 0
            };

            // Add the new reply to the table
            _context.CommentsReplies.Add(newReply);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommentReplies), new { commentId = newReply.CommentId }, newReply);
        }

        [HttpPost("api/comments/reply/change-hidden")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> HideCommentReply([FromBody] HideCommentDTO hideCommentDTO)
        {
            // Find the reply in the database
            var reply = await _context.CommentsReplies.FindAsync(hideCommentDTO.ReplyId);

            if (reply == null)
            {
                return NotFound();
            }

            // Set the Hidden value
            reply.Hidden = hideCommentDTO.Hidden;

            // Save the changes
            await _context.SaveChangesAsync();

            return Ok(reply);
        }

    }
}

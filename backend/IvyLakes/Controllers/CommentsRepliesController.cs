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
    public class CommentsRepliesController : Controller
    {
        private readonly MerchShopContext _context;

        public CommentsRepliesController(MerchShopContext context)
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
                    r.Score
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
                Score = 0
            };

            // Add the new reply to the table
            _context.CommentsReplies.Add(newReply);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommentReplies), new { commentId = newReply.CommentId }, newReply);
        }
    }
}

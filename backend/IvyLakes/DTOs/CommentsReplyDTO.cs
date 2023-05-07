using IvyLakes.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class CommentsReplyDTO 
    {
        public Guid UserId { get; set; }
        public int CommentId { get; set; }
        public string CommentBody { get; set; }
        public string CommentImageUrl { get; set; }

    }
}

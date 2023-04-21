using System;
using System.Collections.Generic;

#nullable disable

namespace IvyLakes.Models
{
    public partial class CommentsReply
    {
        public int ReplyId { get; set; }
        public Guid UserId { get; set; }
        public int CommentId { get; set; }
        public string CommentBody { get; set; }
        public string CommentImageUrl { get; set; }
        public int? Score { get; set; }

        public virtual Comment Comment { get; set; }
        public virtual User User { get; set; }
    }
}

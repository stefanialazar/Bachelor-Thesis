using System;
using System.Collections.Generic;

#nullable disable

namespace IvyLakes.Models
{
    public partial class Comment
    {
        public Comment()
        {
            CommentsReplies = new HashSet<CommentsReply>();
        }

        public int CommentId { get; set; }
        public Guid UserId { get; set; }
        public int SeriesId { get; set; }
        public int SeasonNumber { get; set; }
        public int EpisodeNumber { get; set; }
        public string CommentBody { get; set; }
        public string CommentImageUrl { get; set; }
        public int? Score { get; set; }
        public int? Hidden { get; set; }

        public virtual TvSeries Series { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<CommentsReply> CommentsReplies { get; set; }
    }
}

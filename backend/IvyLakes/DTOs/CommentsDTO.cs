using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class CommentsDTO
    {
        public int CommentId { get; set; }
        public Guid UserId { get; set; }
        public int SeriesId { get; set; }
        public int SeasonNumber { get; set; }
        public int EpisodeNumber { get; set; }
        public string CommentBody { get; set; }
        public string CommentImageURL { get; set; }
        public int Score { get; set; }
        public int Hidden { get; set; }
    }
}


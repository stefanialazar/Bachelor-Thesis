using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
#nullable disable

namespace IvyLakes.Models
{
    public partial class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CommentId { get; set; }
        public Guid UserId { get; set; }
        public int SeriesId { get; set; }
        public int SeasonNumber { get; set; }
        public int EpisodeNumber { get; set; }
        public string CommentBody { get; set; }
        public string CommentImageUrl { get; set; }
        public int Score { get; set; }

        public virtual TvSeries Series { get; set; }
        public virtual User User { get; set; }
    }
}

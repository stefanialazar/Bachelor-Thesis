using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Models
{
    public class Comments
    {
        public int CommentID { get; set; }
        public Guid UserID { get; set; }
        public int SeriesID { get; set; }
        public int SeasonNumber { get; set; }
        public int EpisodeNumber { get; set; }
        public string CommentBody { get; set; }
        public string CommentImageURL { get; set; }
    }
}

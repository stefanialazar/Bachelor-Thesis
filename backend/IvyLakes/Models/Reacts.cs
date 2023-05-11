using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Models
{
    public class Reacts
    {
        public int ReactId { get; set; }
        public Guid UserId { get; set; }
        public int? CommentId { get; set; }
        public int? ReplyId { get; set; }
        public int Reaction { get; set; }
    }
}

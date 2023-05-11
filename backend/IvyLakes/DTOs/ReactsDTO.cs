using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class ReactsDTO
    {
        public Guid UserId { get; set; }
        public int? CommentId { get; set; }
        public int? ReplyId { get; set; }
        public int Reaction { get; set; }
    }
}

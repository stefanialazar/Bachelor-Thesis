using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Models
{
    public class Carts
    {
        public int CartId { get; set; }
        public Guid UserId { get; set; }
        public String Merch { get; set; }
        public virtual User User { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Models
{
    public class Orders
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public Guid UserId { get; set; }
        public String Merch { get; set; }
        public virtual User User { get; set; }
    }
}

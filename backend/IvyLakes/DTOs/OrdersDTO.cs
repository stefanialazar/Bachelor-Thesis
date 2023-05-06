using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class OrdersDTO
    {
        public DateTime OrderDate { get; set; }
        public Guid UserId { get; set; }
        public String Merch { get; set; }
    }
}

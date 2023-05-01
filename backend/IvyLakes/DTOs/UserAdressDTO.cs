using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class UserAdressDTO
    {
        public Guid UserId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
    }
}

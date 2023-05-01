using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class UserEmailDTO
    {
        public Guid UserId { get; set; }
        public string NewEmail { get; set; }
    }
}

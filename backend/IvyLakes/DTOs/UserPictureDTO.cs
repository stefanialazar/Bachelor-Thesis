using IvyLakes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class UserPictureDTO
    {
        public Guid UserId { get; set; }
        public string BackgroundPicture { get; set; }
        public string ProfilePicture { get; set; }
        public string NewEmail { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}

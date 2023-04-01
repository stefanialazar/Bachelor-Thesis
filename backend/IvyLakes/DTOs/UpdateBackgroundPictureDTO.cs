using IvyLakes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class UpdateBackgroundPictureDTO
    {
        public Guid UserId { get; set; }
        public string BackgroundPicture { get; set; }

        public string ProfilePicture { get; set; }
    }
}

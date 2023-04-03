using System;
using System.Collections.Generic;

#nullable disable

namespace IvyLakes.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            UserSeries = new HashSet<UserSeries>();
        }

        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int Points { get; set; }
        public string ProfilePicture { get; set; }
        public string BackgroundPicture { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<UserSeries> UserSeries { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace IvyLakes.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            CommentsReplies = new HashSet<CommentsReply>();
            UserSeries = new HashSet<UserSeries>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int Points { get; set; }
        public string ProfilePicture { get; set; }
        public string BackgroundPicture { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<CommentsReply> CommentsReplies { get; set; }
        public virtual ICollection<UserSeries> UserSeries { get; set; }
    }
}

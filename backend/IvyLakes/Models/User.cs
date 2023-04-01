﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateTime RegistrationDate { get; set; }
        //public ShoppingCart ShoppingCart { get; set; }
        public int Points { get; set; }

        public string ProfilePicture { get; set; }
        public string BackgroundPicture { get; set; }
    }
}

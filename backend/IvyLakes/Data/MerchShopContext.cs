using IvyLakes.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Data
{
    public class MerchShopContext: DbContext
    {
        public MerchShopContext(DbContextOptions<MerchShopContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}

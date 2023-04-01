using IvyLakes.Data;
using IvyLakes.IRepositories;
using IvyLakes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly MerchShopContext _context;
        public UserRepository(MerchShopContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = _context.Users.AsEnumerable();
            return users;
        }
        public async Task<User> GetUser(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }
        public async Task<User> AddUser(User user)
        {
            if(user != null)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
   
            }
            return user;
        }

        public async Task<User> UpdateBackgroundPicture(Guid UserId, string backgroundPicture)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == UserId);

            if (user == null)
            {
                return null;
            }

            user.BackgroundPicture = backgroundPicture;
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> UpdateProfilePicture(Guid UserId, string profilePicture)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == UserId);

            if (user == null)
            {
                return null;
            }

            user.ProfilePicture = profilePicture;
            await _context.SaveChangesAsync();

            return user;
        }
    }
}

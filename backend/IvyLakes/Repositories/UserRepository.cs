using IvyLakes.Data;
using IvyLakes.IRepositories;
using IvyLakes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Helpers;

namespace IvyLakes.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly SeriesSyncContext _context;
        public UserRepository(SeriesSyncContext context)
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
        public async Task<User> UpdateEmail(Guid userId, string newEmail)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return null;
            }

            user.Email = newEmail;
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UpdatePassword(Guid userId, string oldPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return false;
            }

            var pe = new PasswordEncrypter();
            string oldPasswordEncoded = pe.EncodePasswordToBase64(oldPassword);

            if (user.Password != oldPasswordEncoded)
            {
                return false;
            }

            string newPasswordEncoded = pe.EncodePasswordToBase64(newPassword);
            user.Password = newPasswordEncoded;

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<User> UpdateAddresses(Guid userId, string address1, string address2)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return null;
            }

            if (address1 != null)
            {
                user.Address1 = address1;
            }

            if (address2 != null)
            {
                user.Address2 = address2;
            }

            await _context.SaveChangesAsync();
            return user;
        }


        public async Task<User> GetUserById(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }


    }
}

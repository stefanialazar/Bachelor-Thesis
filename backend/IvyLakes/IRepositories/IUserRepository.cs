using IvyLakes.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.IRepositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(string email);
        Task<User> AddUser(User user);
        Task<User> UpdateBackgroundPicture(Guid UserId, string backgroundPicture);
        Task<User> UpdateProfilePicture(Guid UserId, string profilePicture);
        Task<User> UpdateEmail(Guid userId, string newEmail);
        Task<bool> UpdatePassword(Guid userId, string oldPassword, string newPassword);
        Task<User> UpdateAddresses(Guid userId, string address1, string address2);
        Task<User> GetUserById(Guid id);

    }
}

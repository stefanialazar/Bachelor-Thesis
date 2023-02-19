using Backend.Helpers;
using IvyLakes.DTOs;
using IvyLakes.IRepositories;
using IvyLakes.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Controllers
{
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepo;
        public UsersController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [EnableQuery]
        [HttpGet("api/users")]
        public async Task<IActionResult> Get()
        {
            var users = await _userRepo.GetUsers();
            return Ok(users);
        }

        [EnableQuery]
        [HttpPost("api/users")]
        public async Task<IActionResult> AddUser([FromBody] RegisterDTO registerDto)
        {
            var user = await _userRepo.GetUser(registerDto.Email);
            if(user != null)
            {
                return BadRequest("User already exists.");
            }
            var pe = new PasswordEncrypter();
            string pw = pe.EncodePasswordToBase64(registerDto.Password);
            User userToAdd = new User
            {
                Email = registerDto.Email,
                Password = pw,
                LastName = registerDto.Lastname,
                FirstName = registerDto.Firstname,
                Points = 0,
                RegistrationDate = DateTime.Now
            };
            user = await _userRepo.AddUser(userToAdd);
            return Ok(user);

        }
    }
}

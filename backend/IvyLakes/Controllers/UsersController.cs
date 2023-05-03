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

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("api/user/{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userRepo.GetUserById(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
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
                ProfilePicture = "https://i.pinimg.com/564x/ad/11/88/ad1188b5d94c97c2e52acb3bf43c5ac9.jpg",
                BackgroundPicture = "https://i.pinimg.com/564x/63/ba/ff/63baff25d2727d861d2bb882965a881d.jpg",
                Points = 0,
                RegistrationDate = DateTime.Now
            };
            user = await _userRepo.AddUser(userToAdd);
            return Ok(user);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/users/update-background-picture")]
        public async Task<IActionResult> UpdateBackgroundPicture([FromBody] UserPictureDTO updateBackgroundPictureDTO)
        {
            var user = await _userRepo.UpdateBackgroundPicture(updateBackgroundPictureDTO.UserId, updateBackgroundPictureDTO.BackgroundPicture);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/users/update-profile-picture")]
        public async Task<IActionResult> UpdateProfilePicture([FromBody] UserPictureDTO updateBackgroundPictureDTO)
        {
            var user = await _userRepo.UpdateProfilePicture(updateBackgroundPictureDTO.UserId, updateBackgroundPictureDTO.ProfilePicture);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/users/update-email")]
        public async Task<IActionResult> UpdateEmail([FromBody] UserEmailDTO emailUpdateDTO)
        {
            var user = await _userRepo.UpdateEmail(emailUpdateDTO.UserId, emailUpdateDTO.NewEmail);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/users/update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UserPasswordDTO passwordUpdateDTO)
        {
            var result = await _userRepo.UpdatePassword(passwordUpdateDTO.UserId, passwordUpdateDTO.OldPassword, passwordUpdateDTO.NewPassword);

            if (result)
            {
                return Ok(new { message = "Password updated successfully" });
            }

            return BadRequest("Error updating password");
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/users/update-addresses")]
        public async Task<IActionResult> UpdateAddresses([FromBody] UserAdressDTO addressUpdateDTO)
        {
            var user = await _userRepo.UpdateAddresses(addressUpdateDTO.UserId, addressUpdateDTO.Address1, addressUpdateDTO.Address2);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }


    }
}

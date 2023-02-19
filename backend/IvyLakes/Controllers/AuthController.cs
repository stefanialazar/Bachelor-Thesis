using Backend.Helpers;
using IvyLakes.DTOs;
using IvyLakes.IRepositories;
using IvyLakes.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IvyLakes.Controllers
{
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _userRepo;

        public AuthController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [EnableQuery]
        [EnableCors]
        [HttpPost("api/users/login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            try
            {
                User user = await _userRepo.GetUser(dto.Username);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                PasswordEncrypter pe = new PasswordEncrypter();
                if (pe.DecodeFrom64(user.Password) == dto.Password)
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("cocolino07012023"));
                    var signingCredetials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var userClaims = new List<Claim>();
                    var claim = new Claim("id", user.Id.ToString());
                    var claim1 = new Claim("firstname", user.FirstName);
                    var claim2 = new Claim("lastname", user.LastName);


                    userClaims.Add(claim);
                    userClaims.Add(claim1);
                    userClaims.Add(claim2);
                    var tokenOptions = new JwtSecurityToken(
                        issuer: "https://localhost:44341/",
                        audience: "https://localhost:4200/",
                        claims: userClaims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: signingCredetials
                        );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                    
       
      
                    TokenDTO tokenDto = new TokenDTO();
                    tokenDto.Token = tokenString;
                    return Ok(tokenDto);
                }
                else return BadRequest("WrongPassword");
            }
            catch (Exception ex)
            {
                return BadRequest(null);
            }
        }
    }
}


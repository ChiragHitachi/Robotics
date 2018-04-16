using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Robotics.API.Models;

namespace Robotics.API.Controllers {


    public class AccountController {

        private IConfiguration _configuration {
            get;
            set;
        }

        public AccountController(IConfiguration configuration) {
            this._configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/Login")]
        public IActionResult Login([FromBody] LoginModel request) {

            if (request.UserName == "Chirag" && request.Password == "DEMO ONLY!") {
                var claims = new [] {
                    new Claim(ClaimTypes.Name, request.UserName),
                    new Claim("CompletedTraining", "")
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "localhost",
                    audience: "localhost",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return new  OkObjectResult(new {
                    access_token = new JwtSecurityTokenHandler().WriteToken(token),
                    expires = token.ValidTo
                });
            }

            return new BadRequestObjectResult("Could not verify username and password");
        }
    }
}
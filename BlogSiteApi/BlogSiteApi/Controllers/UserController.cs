using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using BlogSiteApi.Data.Models;
using BlogSiteApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogSiteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserServices userServices;
        public UserController(IUserServices userServices)
        {
            this.userServices = userServices;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] UserViewModel userViewModel)
        {
            var result = await userServices.SignUp(userViewModel);
            if (result != null)
            {
                return Ok(result);
            }
            else
                return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserViewModel userViewModel)
        {
            var result = await userServices.Login(userViewModel);
            if (result != null)
            {
                if (result.IsConfirmed == false)
                {
                    return BadRequest("Hesabınız doğrulanmamıştır, E-Mailinizi Kontrol Ediniz!");
                }
                return Ok(userViewModel);
            }
            else
                return BadRequest("Kullanıcı Adı ya da Şifre Yanlış ");
        }

        [HttpGet("{id}")]
        public IActionResult EmailVertification(string id) 
        {
           userServices.EmailVerify(Guid.Parse(id));
            return Ok();
        }

        [HttpPost("Edit/{id}")]
        public IActionResult EditUser(UserViewModel userViewModel, string id)
        {
            var userid = Guid.Parse(id);
            var edited = userServices.EditProfile(userViewModel, userid);
            return Ok(edited);
        }

    }
}

using BlogSiteApi.Data;
using BlogSiteApi.Data.Entities;
using BlogSiteApi.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace BlogSiteApi.Services
{
    public class UserServices : IUserServices
    {
        private SiteDbContext _context;
        private readonly IConfiguration _configuration;
        public UserServices(SiteDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<UserViewModel> EditProfile(UserViewModel userViewModel, Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            user.UserName = userViewModel.UserName;
            user.Password = CriyptoPassword(userViewModel.Password);
            await _context.SaveChangesAsync();
            return userViewModel;
        }

        public async Task<UserViewModel> Login(UserViewModel userViewModel)
        {
            try
            {
                if (userViewModel.Password != null)
                    userViewModel.Password = CriyptoPassword(userViewModel.Password);
                else
                    return null;
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userViewModel.UserName);
                if (user.Password == userViewModel.Password)
                {
                    userViewModel.Token = GetToken(user.Role, user.UserID);
                    userViewModel.EMail = user.EMail;
                    userViewModel.Role = user.Role;
                    userViewModel.Password = null;
                    if (user.IsEmailConfirmed == false)
                    {
                        userViewModel.IsConfirmed = user.IsEmailConfirmed;
                        SendEMail(user.EMail, user.UserID);
                        return userViewModel;
                    }
                    else
                    {
                        userViewModel.IsConfirmed = user.IsEmailConfirmed;
                        return userViewModel;
                    }

                }
                else
                    return null;

            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }

        }

        public async Task<UserViewModel> SignUp(UserViewModel userViewModel)
        {
            
            if (userViewModel.Password != null)
                userViewModel.Password = CriyptoPassword(userViewModel.Password);
            else
                return null;
            
            try
            {
                await _context.Users.AddAsync(new User
                {
                    UserID = Guid.NewGuid(),
                    UserName = userViewModel.UserName,
                    Password = userViewModel.Password,
                    EMail = userViewModel.EMail,
                    Role = "User",
                    IsEmailConfirmed = false
                });
                await _context.SaveChangesAsync();
                return userViewModel;
            }
            catch (Exception)
            {                 
                throw;
            }
             
        }

        public bool EmailVerify(Guid id)
        {
            var user = _context.Users.Find(id);
            user.IsEmailConfirmed = true;
            _context.SaveChanges();
            return true;
        }

        public string GetToken(string Role, Guid ID)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                            new Claim(ClaimTypes.Name, ID.ToString()),
                            new Claim(ClaimTypes.Role, Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string CriyptoPassword(string password)
        {
            SHA256 sha = SHA256.Create();
            byte[] bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            StringBuilder builder = new StringBuilder();
            foreach (var item in bytes)
            {
                builder.Append(item.ToString("x2"));
            }
            return builder.ToString();
        }

        public bool SendEMail(string EMail, Guid ID)
        {
            try
            {
                var url = "http://localhost:3000/EMailVertification/" + ID.ToString();
                MailMessage mail = new MailMessage();
                mail.IsBodyHtml = true;
                mail.To.Add(EMail);
                mail.From = new MailAddress("kiziltepedogukan@gmail.com", "Email Doğrulama", System.Text.Encoding.UTF8);
                mail.Subject = "Email Doğrulama";
                mail.Body = $"<a target=\"_blank\" href='" + url + "'>Emaili doğrulamak için tıklayınız</a>";
                mail.IsBodyHtml = true;
                SmtpClient smp = new SmtpClient();
                smp.Credentials = new NetworkCredential("kiziltepedogukan@gmail.com", "199956789cfb");
                smp.Port = 587;
                smp.Host = "smtp.gmail.com";
                smp.EnableSsl = true;
                smp.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }
    }
    }

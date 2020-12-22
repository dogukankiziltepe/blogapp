using BlogSiteApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteApi.Services
{
   public interface IUserServices
    {
        public Task<UserViewModel> Login(UserViewModel userViewModel);
        public Task<UserViewModel> SignUp(UserViewModel userViewModel);
        public Task<UserViewModel> EditProfile(UserViewModel userViewModel, Guid id);
        public bool EmailVerify(Guid id);
        public string GetToken(string Role, Guid ID);
        public string CriyptoPassword(string password);
        public bool SendEMail(string EMail, Guid ID);
    }
}

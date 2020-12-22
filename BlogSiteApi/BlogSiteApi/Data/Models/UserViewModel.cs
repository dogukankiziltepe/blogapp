using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteApi.Data.Models
{
    public class UserViewModel
    {
        public Guid ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EMail { get; set; }
        public string Role { get; set; }
        public bool IsConfirmed { get; set; }
        public string Token { get; set; }
        public bool IsPersistent { get; set; }

    }
}

using BlogSiteApi.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteApi.Services
{
   public interface ICategoryServices
    {
        public List<Category> GetCategories();
    }
}

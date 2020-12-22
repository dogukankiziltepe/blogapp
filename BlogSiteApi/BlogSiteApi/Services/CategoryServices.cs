using BlogSiteApi.Data;
using BlogSiteApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteApi.Services
{
    public class CategoryServices : ICategoryServices
    {
        private SiteDbContext _context;
        public CategoryServices(SiteDbContext context)
        {
            _context = context;
        }

        public List<Category> GetCategories()
        {
            return _context.Categories.ToList();
        }
    }
}

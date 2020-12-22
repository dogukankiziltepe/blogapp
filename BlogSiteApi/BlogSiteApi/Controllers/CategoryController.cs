using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogSiteApi.Data.Entities;
using BlogSiteApi.Data.Models;
using BlogSiteApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogSiteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryServices _categoryServices;
        public CategoryController(ICategoryServices categoryServices)
        {
            _categoryServices = categoryServices;
        }

        [HttpGet]
        public IActionResult GetCategories() 
        { 
            var list = _categoryServices.GetCategories();
            return Ok(list);
        }
    }
}

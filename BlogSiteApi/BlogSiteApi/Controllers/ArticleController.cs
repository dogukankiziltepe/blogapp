using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BlogSiteApi.Data.Entities;
using BlogSiteApi.Data.Models;
using BlogSiteApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogSiteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private IArticleServices articleServices;
        public ArticleController(IArticleServices articleServices)
        {
            this.articleServices = articleServices;
        }

        [HttpGet("getarticle/{id}")]
        public IActionResult GetArticle(string id)
        {
            var articleid = Guid.Parse(id);
            var result = articleServices.GetArticle(articleid);
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = articleServices.GetArticles();
            return Ok(result);
        }

        [HttpGet("editorarticles")]
        public  IActionResult GetNonConfirmedArticles()
        {
            var result = articleServices.GetNonConfirmedArticles();
            return Ok(result);
        }
        [Authorize]
        [HttpPost]
        public IActionResult AddArticle([FromBody] ArticleViewModel article)
        {
            var ID =  User.Claims.Where(x=> x.Type == ClaimTypes.Name ).FirstOrDefault();
            articleServices.AddArticle(article, ID.Value);
            return Ok(article);
        }

        [HttpGet("search/{key}")]
        public IActionResult SearchArticle(string key)
        {
            var articles = articleServices.SearchArticle(key);
            if (articles != null)
            {
                return Ok(articles);
            }
            else
                return BadRequest();
        }

        [Authorize(Roles = "Editör")]
        [HttpPost("edit/{id}")]
        public IActionResult EditArticle(Guid id, [FromBody] ArticleViewModel article)
        {
            var result = articleServices.EditArticle(id, User.Claims.Where(x => x.Type == ClaimTypes.Role).FirstOrDefault().Value, article);
            if (result != null)
                return Ok(article);
            else
                return BadRequest();
        }

        [HttpGet("getuser/{username}")]
        public IActionResult GetUserArticles(string username)
        {
            var result = articleServices.GetArticleswithUser(username);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }

        [HttpGet("category/{categoryName}")]
        public IActionResult GetCategoryArticles(string categoryName)
        {
            var result = articleServices.GetArticleswithCategory(categoryName);
            if (result != null)
                return Ok(result);
            else
                return BadRequest();
        }
    }
}

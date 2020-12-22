using BlogSiteApi.Data.Entities;
using BlogSiteApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteApi.Services
{
   public interface IArticleServices
    {
        public Task<ArticleViewModel> GetArticle(Guid id);
        public Task<List<ArticleViewModel>> GetArticles();
        public Task<List<ArticleViewModel>> GetArticleswithUser(string username);
        public Task<List<ArticleViewModel>> GetArticleswithCategory(string categoryName);
        public ArticleViewModel AddArticle(ArticleViewModel article,string ID);
        public Task<bool> DeleteArticle(ArticleViewModel article);
        public Task<List<ArticleViewModel>> SearchArticle(string key);
        public ArticleViewModel EditArticle(Guid id, string role, ArticleViewModel article);

        public Task<List<ArticleViewModel>> GetNonConfirmedArticles();
        
    }
}

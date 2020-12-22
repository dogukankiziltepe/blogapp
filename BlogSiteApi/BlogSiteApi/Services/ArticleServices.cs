using BlogSiteApi.Data;
using BlogSiteApi.Data.Entities;
using BlogSiteApi.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteApi.Services
{
    public class ArticleServices : IArticleServices
    {
        private SiteDbContext _context;
        public ArticleServices(SiteDbContext context)
        {
            _context = context;
        }
        public ArticleViewModel AddArticle(ArticleViewModel article, string ID)
        {
            var userid = Guid.Parse(ID);
            var user = _context.Users.Find(userid);
            var category = _context.Categories.Find(article.CategoryID);
            var shortcontent = article.Content.Substring(0,100);
            article.ID = Guid.NewGuid();
            _context.Articles.Add(new Article 
            {
                ID = Guid.NewGuid(),
                Title = article.Title,
                Content = article.Content,
                ShortContent = shortcontent,
                IsConfirmed = false,
                UserID = userid,
                CategoryID = article.CategoryID,
            });
            _context.SaveChanges();
            return article;
        }

        public async Task<bool> DeleteArticle(ArticleViewModel article)
        {
            try
            {
                var deleteitem = await _context.Articles.FindAsync(article.ID);
                _context.Articles.Remove(deleteitem);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            } 
        }


        public ArticleViewModel EditArticle(Guid id, string role, ArticleViewModel article)
        {
            var resultArticle = _context.Articles.Find(id);
            resultArticle.Content = article.Content;
            if(role == "Editör" || role == "Admin")
            {
                resultArticle.IsConfirmed = true;
            }
            _context.SaveChanges();
            return article;
        }

        public async Task<ArticleViewModel> GetArticle(Guid id)
        {
            var article = await _context.Articles.FindAsync(id);
            ArticleViewModel articleViewModel = new ArticleViewModel
            {
                ID = article.ID,
                Content = article.Content,
                CategoryID = article.CategoryID,
                Title = article.Title,
                CategoryName = _context.Categories.Find(article.CategoryID).CategoryName,
                UserName = _context.Users.Find(article.UserID).UserName
            };
            return articleViewModel;

        }

        public async Task<List<ArticleViewModel>> GetArticles()
        {
            List<ArticleViewModel> articleViewModels = new List<ArticleViewModel>();
            var list = await _context.Articles.Where(x=> x.IsConfirmed == true).ToListAsync();
            for(int i = 0; i < list.Count; i++)
            {
                var Category = await _context.Categories.FindAsync(list[i].CategoryID);
                var User = await _context.Users.FindAsync(list[i].UserID);
                articleViewModels.Add(new ArticleViewModel
                {
                    ID = list[i].ID,
                    Title = list[i].Title,
                    Content = list[i].Content,
                    ShortContent = list[i].ShortContent,
                    UserName = User.UserName,
                    CategoryID = list[i].CategoryID,
                    CategoryName = _context.Categories.Find(list[i].CategoryID).CategoryName
                }) ;
            }
            return articleViewModels;
        }

        public async Task<List<ArticleViewModel>> GetArticleswithCategory(string categoryName)
        {
            List<ArticleViewModel> articleViewModels = new List<ArticleViewModel>();
            var category = await _context.Categories.Where(x => x.CategoryName == categoryName).FirstOrDefaultAsync();
            var list = await _context.Articles.Where(x => x.CategoryID == category.CategoryID && x.IsConfirmed == true ).ToListAsync();
            for (int i = 0; i < list.Count; i++)
            {
                articleViewModels.Add(new ArticleViewModel
                {
                    ID = list[i].ID,
                    Title = list[i].Title,
                    Content = list[i].Content,
                    ShortContent = list[i].ShortContent,
                    CategoryName = category.CategoryName,
                    UserName = _context.Users.Find(list[i].UserID).UserName
                });
            }
            return articleViewModels;
        }

        public async Task<List<ArticleViewModel>> GetArticleswithUser(string username)
        {
            List<ArticleViewModel> articleViewModels = new List<ArticleViewModel>();
            var user = await _context.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();
            var list = await _context.Articles.Where(x => x.UserID == user.UserID && x.IsConfirmed == true).ToListAsync();
            for (int i = 0; i < list.Count; i++)
            {
                articleViewModels.Add(new ArticleViewModel
                {
                    ID = list[i].ID,
                    Title = list[i].Title,
                    Content = list[i].Content,
                    ShortContent = list[i].ShortContent,
                    CategoryName = _context.Categories.Find(list[i].CategoryID).CategoryName,
                    UserName = user.UserName
                }) ;
            }
            return articleViewModels;
        }

        public async Task<List<ArticleViewModel>> GetNonConfirmedArticles()
        {
            List<ArticleViewModel> articleViewModels = new List<ArticleViewModel>();
            var list = await _context.Articles.Where(x => x.IsConfirmed == false).ToListAsync();
            for (int i = 0; i < list.Count; i++)
            {
                articleViewModels.Add(new ArticleViewModel
                {
                    ID = list[i].ID,
                    Title = list[i].Title,
                    Content = list[i].Content,
                    ShortContent = list[i].ShortContent,
                    CategoryName = _context.Categories.Find(list[i].CategoryID).CategoryName,
                    UserName = _context.Users.Find(list[i].UserID).UserName
                });
            }
            return articleViewModels;
        }

        public async Task<List<ArticleViewModel>> SearchArticle(string key)
        {
            try
            {
                List<ArticleViewModel> articleViewModels = new List<ArticleViewModel>();
                var list = await _context.Articles.Where(x => x.Content.Contains(key) || x.Title.Contains(key)).ToListAsync();
                for (int i = 0; i < list.Count; i++)
                {
                    articleViewModels.Add(new ArticleViewModel
                    {
                        ID = list[i].ID,
                        Title = list[i].Title,
                        Content = list[i].Content,
                        ShortContent = list[i].ShortContent,
                        CategoryName = _context.Categories.Find(list[i].CategoryID).CategoryName,
                        UserName = _context.Users.Find(list[i].UserID).UserName
                    });
                }
                return articleViewModels;
            }
            catch (Exception ex)
            {
                return null;
                throw ex;
            }
        }
    }
}

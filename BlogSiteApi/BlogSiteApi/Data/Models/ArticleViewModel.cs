using BlogSiteApi.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteApi.Data.Models
{
    public class ArticleViewModel
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ShortContent { get; set; }
        public bool IsConfirmed { get; set; }
        public Guid CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string UserName { get; set; }
    }
}

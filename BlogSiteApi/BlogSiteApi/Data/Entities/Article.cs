using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSiteApi.Data.Entities
{
    public class Article
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ShortContent { get; set; }
        public bool IsConfirmed { get; set; }
        public Guid UserID { get; set; }
        public User User { get; set; }
        public Guid CategoryID { get; set; }
        public Category Category { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int AuthorId { get; set; }
        public virtual User Author { get; set; }
        public virtual List<Comment> ComentsTo { get; set; }
        public virtual List<Comment> ComentsBy { get; set; }
        public int CommentedFilmId { get; set; }
        public virtual Film CommentedFilm { get; set; }
    }
}

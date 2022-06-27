using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CommentRepository : GenericRepository<Comment>
    {
        public CommentRepository(DbContext context) : base(context)
        {

        }
        public List<Comment> GetCommentsTo(int id)
        {
            FilmContext con = (FilmContext)context;
            List<Comment> commentsTo = con.Coments
                                        .Include(x => x.ComentsTo)
                                        .Where(x => x.Id == id)
                                        .Select(x => x.ComentsTo)
                                        .ToList()[0]
                                        .ToList();
            foreach (Comment comment in commentsTo)
                comment.ComentsBy = null;
            return commentsTo;
        }
        public List<Comment> GetCommentsBy(int id)
        {
            FilmContext con = (FilmContext)context;
            List<Comment> commentsBy = con.Coments
                                        .Include(x => x.ComentsBy)
                                        .Where(x => x.Id == id)
                                        .Select(x => x.ComentsBy)
                                        .ToList()[0]
                                        .ToList();
            foreach (Comment comment in commentsBy)
                comment.ComentsTo = null;
            return commentsBy;
        }
    }
}

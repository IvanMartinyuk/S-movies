using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
namespace DAL.Repositories
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(FilmContext context) : base(context) { }
        public List<Selection> GetSelections(string login)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Users.Include(x => x.Selections)
                              .ToList()
                              .Where(x => x.Login == login)
                              .Select(x => x.Selections)
                              .ToList()[0]
                              .ToList();
            foreach (Selection selection in list)
                selection.Films = null;
            return list;
        }
    }
}

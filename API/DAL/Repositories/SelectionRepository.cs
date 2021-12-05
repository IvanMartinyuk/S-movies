using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL.Repositories
{
    public class SelectionRepository : GenericRepository<Selection>
    {
        public SelectionRepository(FilmContext context) : base(context) 
        { 
        }
        public List<Film> GetFilms(int id)
        {
            FilmContext contx = (FilmContext)context;
            return contx.Selections.Include(x => x.Films)
                                .Where(x => x.Id == id)
                                .Select(x => x.Films)
                                .ToList()[0]
                                .ToList();
        }
    }
}

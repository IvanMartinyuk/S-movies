using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class WriterRepository : GenericRepository<Writer>
    {
        public WriterRepository(FilmContext context) : base(context)
        {

        }
        public List<Film> GetFilms(int id)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Writers.Include(x => x.Films)
                                .ToList()
                                .Where(x => x.Id == id)
                                .Select(x => x.Films)
                                .ToList()[0]
                                .ToList();
            foreach (Film film in list)
                film.Writers = null;
            return list;
        }
        public List<Writer> Search(string name)
        {
            int limit = 10;
            var contx = (FilmContext)context;
            return contx.Writers.Where(x => x.Name.ToLower().Contains(name.ToLower()))
                               .Take(10)
                               .ToList();
        }
    }
}

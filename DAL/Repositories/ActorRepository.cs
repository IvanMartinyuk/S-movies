using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class ActorRepository : GenericRepository<Actor>
    {
        public ActorRepository(FilmContext context) : base(context)
        {

        }
        public void GetFilms(int id)
        {
            FilmContext contx = (FilmContext)context;
            
        }
    }
}

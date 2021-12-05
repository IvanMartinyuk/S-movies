using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class FilmRepository : GenericRepository<Film>
    {
        public FilmRepository(FilmContext context) : base(context)
        {

        }
        public List<Actor> GetActors(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            return contx.Films.Include(x => x.Actors)
                       .Where(x => x.Id == filmId)
                       .Select(x => x.Actors)
                       .ToList()[0]
                       .ToList();
        }
        public List<Producer> GetProducers(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            return contx.Films.Include(x => x.Producers)
                       .Where(x => x.Id == filmId)
                       .Select(x => x.Producers)
                       .ToList()[0]
                       .ToList();
        }
        public List<Genre> GetGenres(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            return contx.Films.Include(x => x.Genres)
                       .Where(x => x.Id == filmId)
                       .Select(x => x.Genres)
                       .ToList()[0]
                       .ToList();
        }
        public List<Director> GetDirectors(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            return contx.Films.Include(x => x.Directors)
                      .Where(x => x.Id == filmId)
                      .Select(x => x.Directors)
                      .ToList()[0]
                      .ToList();
        }
        public List<Selection> GetSelections(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            return contx.Films.Include(x => x.Selections)
                      .Where(x => x.Id == filmId)
                      .Select(x => x.Selections)
                      .ToList()[0]
                      .ToList();
        }
        public Company GetCompany(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            return contx.Films.Include(x => x.Company)
                        .Where(x => x.Id == filmId)
                        .Select(x => x.Company)
                        .ToList()[0];
        }
    }
}

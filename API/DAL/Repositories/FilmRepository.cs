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
            var list = contx.Films.Include(x => x.Actors)
                                .ToList()
                       .Where(x => x.Id == filmId)
                       .Select(x => x.Actors)
                       .ToList()[0]
                       .ToList();
            foreach (Actor actor in list)
                actor.Films = null;
            return list;
        }
        public List<Writer> GetWriters(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Films.Include(x => x.Writers)
                                .ToList()
                       .Where(x => x.Id == filmId)
                       .Select(x => x.Writers)
                       .ToList()[0]
                       .ToList();
            foreach (Writer writer in list)
                writer.Films = null;
            return list;
        }
        public List<Genre> GetGenres(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Films.Include(x => x.Genres)
                                .ToList()
                       .Where(x => x.Id == filmId)
                       .Select(x => x.Genres)
                       .ToList()[0]
                       .ToList();
            foreach (Genre genre in list)
                genre.Films = null;
            return list;
        }
        public List<Director> GetDirectors(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Films.Include(x => x.Directors)
                                .ToList()
                      .Where(x => x.Id == filmId)
                      .Select(x => x.Directors)
                      .ToList()[0]
                      .ToList();
            foreach (Director director in list)
                director.Films = null;
            return list;
        }
        public List<Selection> GetSelections(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Films.Include(x => x.Selections)
                                .ToList()
                      .Where(x => x.Id == filmId)
                      .Select(x => x.Selections)
                      .ToList()[0]
                      .ToList();
            foreach (Selection selection in list)
                selection.Films = null;
            return list;
        }
        public Company GetCompany(int filmId)
        {
            FilmContext contx = (FilmContext)context;
            var company = contx.Films.Include(x => x.Company)
                                .ToList()
                        .Where(x => x.Id == filmId)
                        .Select(x => x.Company)
                        .ToList()[0];
            company.Films = null;
            return company;
        }
        public Film GetFull(Film film)
        {
            FilmContext con = (FilmContext)context;
            return con.Films.Include(x => x.Actors)
                             .Include(x => x.Writers)
                             .Include(x => x.Directors)
                             .Include(x => x.Genres)
                             .FirstOrDefault(x => x.ImdbId == film.ImdbId);
        }
        public List<Comment> GetComments(int filmId)
        {
            FilmContext con = (FilmContext)context;
            var list = con.Films.Include(x => x.Comments)
                            .FirstOrDefault(x => x.Id == filmId)
                            .Comments;
            list.ForEach(x => x.CommentedFilm = null);
            return list;
        }
    }
}

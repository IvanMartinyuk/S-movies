using DAL.Context;
using FilmsSpeedRunAPI;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class FilmRepository : GenericRepository<Film>
    {
        public static int sortPageCount = 0;
        int pageCount = 25;
        public FilmRepository(FilmContext context) : base(context)
        {

        }
        public List<Film> Search(string title, int page = 0)
        {
            FilmContext con = (FilmContext)context;
            sortPageCount = (con.Films
                                    .Where(x => x.Title.ToLower().Contains(title.ToLower()))
                                    .Count() / pageCount) + 1;
            return con.Films.Where(x => x.Title.ToLower().Contains(title.ToLower()))
                            .Skip(page * pageCount)
                            .Take(pageCount)
                            .ToList();
        }
        public List<Film> GetSortedFilter(FilterOptions options)
        {
            FilmContext con = (FilmContext)context;
            switch (options.SortBy.ToLower())
            {
                case "releasedate":
                    return SortAndFilter(options, x => x.DateOfPublishing);
                case "localrating":
                    return SortAndFilter(options, x => x.LocalRating);
                case "imdbrating":
                    return SortAndFilter(options, x => x.ImdbRating);
                case "title":
                    return SortAndFilter(options, x => x.Title);
                default:
                    return SortAndFilter(options, x => x.Id);
            }
        }
        List<Film> SortAndFilter(FilterOptions options, Expression<Func<Film, object>> selector)
        {           
            FilmContext con = (FilmContext)context;

            IQueryable<Film> configure;
            if (options.isDecreace)
                configure = con.Films.OrderByDescending(selector);
            else
                configure = con.Films.OrderBy(selector);
            configure = configure.Where(x => x.ImdbRating >= options.ImdbRatingTop && x.ImdbRating <= options.ImdbRatingLast)
                                 .Where(x => x.LocalRating >= options.LocalRatingTop && x.LocalRating <= options.LocalRatingLast)
                                 .Where(x => x.DateOfPublishing >= options.DateTop && x.DateOfPublishing <= options.DateLast);
            if (options.Genre.Count() > 0)
                configure = configure.Where(x => x.Genres.Contains(con.Genres.FirstOrDefault(x => x.Name == options.Genre)));
            if (options.Title.Count() > 0)
                configure = configure.Where(x => x.Title.ToLower().Contains(options.Title.ToLower()));
            if (options.ActorId != 0)
                configure = configure.Where(x => x.Actors.Where(x => x.Id == options.ActorId).Count() > 0);
            if (options.WriterId != 0)
                configure = configure.Where(x => x.Writers.Where(x => x.Id == options.WriterId).Count() > 0);
            if (options.DirectorId != 0)
                configure = configure.Where(x => x.Directors.Where(x => x.Id == options.DirectorId).Count() > 0);
            sortPageCount = (configure.Count() / pageCount) + 1;
            return configure.Skip(options.Page * pageCount)
                            .Take(pageCount)
                            .ToList();
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
        public Film GetFull(Film film)
        {
            FilmContext con = (FilmContext)context;
            return con.Films.Include(x => x.Actors)
                             .Include(x => x.Writers)
                             .Include(x => x.Directors)
                             .Include(x => x.Genres)
                             .FirstOrDefault(x => x.ImdbId == film.ImdbId);
        }
        public List<string> GetSCreenshots(int filmId)
        {
            FilmContext con = (FilmContext)context;
            return con.Screenshots.Where(x => x.FilmId == filmId).Select(x => x.Url).ToList();
        }
        public int GetPageCount()
        {
            FilmContext con = (FilmContext)context;
            return (con.Films.Count() / pageCount) + 1;
        }
        public void Vote(double vote, int filmId)
        {
            FilmContext con = (FilmContext)context;
            var film = con.Films.Where(x => x.Id == filmId).FirstOrDefault();
            film.LocalRating = (film.LocalRating + vote) / ++film.LocalRatingVotes;
            con.SaveChanges();
        }
        public DateTime GetOldestDate()
        {
            FilmContext con = (FilmContext)context;
            return con.Films.Min(x => x.DateOfPublishing);
        }
    }
}

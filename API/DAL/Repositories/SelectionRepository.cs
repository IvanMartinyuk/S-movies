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
        int pageCount = 5;
        public SelectionRepository(FilmContext context) : base(context) 
        { 
        }
        public void AddFilm(int selectionId, int filmId)
        {
            FilmContext contx = (FilmContext)context;
            Selection select = contx.Selections.Include(x => x.Films).FirstOrDefault(s => s.Id == selectionId);
            select.Films.Add(contx.Films.Find(filmId));
            contx.SaveChanges();
        }
        public void AddFilms(int selectionId, List<int> filmIds)
        {
            FilmContext contx = (FilmContext)context;
            Selection select = contx.Selections.Include(x => x.Films).FirstOrDefault(s => s.Id == selectionId);
            foreach(var filmid in filmIds)
                select.Films.Add(contx.Films.Find(filmid));
            contx.SaveChanges();
        }
        public void RemoveFilm(int selectionId, int filmId)
        {
            FilmContext contx = (FilmContext)context;
            Selection select = contx.Selections.Include(x => x.Films).FirstOrDefault(s => s.Id == selectionId);
            select.Films.Remove(contx.Films.Find(filmId));
            contx.SaveChanges();
        }
        public List<Film> GetFilms(int id)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Selections.Include(x => x.Films)
                                .ToList()
                                .Where(x => x.Id == id)
                                .Select(x => x.Films)
                                .ToList()[0]
                                .ToList();
            foreach (Film film in list)
                film.Selections = null;
            return list;
        }
        public List<Selection> GetTop(int page)
        {
            FilmContext contx = (FilmContext)context;
            List<Selection> selections = contx.Selections
                                              .OrderByDescending(x => x.Rating)
                                              .Skip(page * pageCount)                                              
                                              .Take(pageCount)
                                              .ToList();
            return selections;
        }
        public int GetPageCount()
        {
            FilmContext con = (FilmContext)context;
            return (con.Selections.Count() / pageCount) + 1;
        }
        public int GetLastId()
        {
            FilmContext contx = (FilmContext)context;
            return contx.Selections.Max(x => x.Id);
        }
        public List<Selection> Search(string title)
        {
            FilmContext contxt = (FilmContext)context;
            return contxt.Selections.Where(sel => sel.Name.ToLower().Contains(title.ToLower())).ToList();
        }
        public List<Selection> SearchByUser(string title, string login)
        {
            FilmContext contxt = (FilmContext)context;
            int userId = contxt.Users.Where(x => x.Login == login).FirstOrDefault().Id;
            return contxt.Selections.Where(sel => sel.Name.ToLower().Contains(title.ToLower()) && sel.UserId == userId).ToList();
        }
    }
}

using BLL.DTO;
using DAL.Context;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class FilmService : GenericService<FilmDTO, Film>
    {
        public FilmService(FilmContext context)
        {
            Repository = new FilmRepository(context);
        }
        public List<Actor> GetActors(int filmId) => ((FilmRepository)Repository).GetActors(filmId);
        public List<Producer> GetProducers(int filmId) => ((FilmRepository)Repository).GetProducers(filmId);
        public List<Genre> GetGenres(int filmId) => ((FilmRepository)Repository).GetGenres(filmId);
        public List<Director> GetDirectors(int filmId) => ((FilmRepository)Repository).GetDirectors(filmId);
        public List<Selection> GetSelections(int filmId) => ((FilmRepository)Repository).GetSelections(filmId);
        public Company GetCompany(int filmId) => ((FilmRepository)Repository).GetCompany(filmId);
    }
}

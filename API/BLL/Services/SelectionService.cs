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
    public class SelectionService : GenericService<SelectionDTO, Selection>
    {
        public SelectionService(FilmContext context)
        {
            Repository = new SelectionRepository(context);
        }
        public List<Film> GetFilms(int id) => ((SelectionRepository)Repository).GetFilms(id);
        public void AddFilm(int selId, int filmId) => ((SelectionRepository)Repository).AddFilm(selId, filmId);
        public void AddFilms(int selId, List<int> filmIds) => ((SelectionRepository)Repository).AddFilms(selId, filmIds);
        public void RemoveFilm(int selId, int filmId) => ((SelectionRepository)Repository).RemoveFilm(selId, filmId);
        public int GetLastId() => ((SelectionRepository)Repository).GetLastId();
        public List<SelectionDTO> GetTop() => Mapper.Map<List<Selection>, List<SelectionDTO>>(((SelectionRepository)Repository).GetTop());
    }
}

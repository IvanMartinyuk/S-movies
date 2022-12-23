﻿using DAL.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class DirectorRepository : GenericRepository<Director>
    {
        public DirectorRepository(FilmContext context) : base(context)
        {

        }
        public List<Film> GetFilms(int id)
        {
            FilmContext contx = (FilmContext)context;
            var list = contx.Directors.Include(x => x.Films)
                                .ToList()
                                .Where(x => x.Id == id)
                                .Select(x => x.Films)
                                .ToList()[0]
                                .ToList();
            foreach (Film film in list)
                film.Directors= null;
            return list;
        }
        public List<Director> Search(string name)
        {
            int limit = 10;
            var contx = (FilmContext)context;
            return contx.Directors.Where(x => x.Name.ToLower().Contains(name.ToLower()))
                               .Take(10)
                               .ToList();
        }
    }
}

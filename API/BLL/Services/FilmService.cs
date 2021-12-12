using AutoMapper;
using BLL.DTO;
using DAL.Context;
using DAL.Repositories;
using FilmsSpeedRunAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class FilmService : GenericService<FilmDTO, Film>
    {
        List<FilmDTO> films { get; set; }
        string Mode { get; set; } = "base";
        public FilmService(FilmContext context)
        {
            Repository = new FilmRepository(context);
            films = GetAll().ToList();
            MapperConfiguration config = new MapperConfiguration(con =>
            {
                con.CreateMap<Film, FilmDTO>().ReverseMap();
                con.CreateMap<Actor, ActorDTO>().ReverseMap();
                con.CreateMap<Producer, ProducerDTO>().ReverseMap();
                con.CreateMap<Director, DirectorDTO>().ReverseMap();
                con.CreateMap<Genre, GenreDTO>().ReverseMap();
            });
            Mapper = new Mapper(config);
        }
        public override async Task AddAsync(FilmDTO filmdto)
        {
            Film film = Mapper.Map<FilmDTO, Film>(filmdto);
            film.Actors = Mapper.Map<List<ActorDTO>, List<Actor>>(filmdto.Actors);
            film.Producers = Mapper.Map<List<ProducerDTO>, List<Producer>>(filmdto.Producers);
            film.Directors = Mapper.Map<List<DirectorDTO>, List<Director>>(filmdto.Directors);
            film.Genres = Mapper.Map<List<GenreDTO>, List<Genre>>(filmdto.Genres);
            await Repository.AddAsync(film);
            await Repository.SaveChanges();
        }
        public List<Actor> GetActors(int filmId) => ((FilmRepository)Repository).GetActors(filmId);
        public List<Producer> GetProducers(int filmId) => ((FilmRepository)Repository).GetProducers(filmId);
        public List<Genre> GetGenres(int filmId) => ((FilmRepository)Repository).GetGenres(filmId);
        public List<Director> GetDirectors(int filmId) => ((FilmRepository)Repository).GetDirectors(filmId);
        public List<Selection> GetSelections(int filmId) => ((FilmRepository)Repository).GetSelections(filmId);
        public Company GetCompany(int filmId) => ((FilmRepository)Repository).GetCompany(filmId);
        public List<FilmDTO> GetSortedPage(string property, int page)
        {
            
            if(property == "dateofpublishing" && Mode == property)
                films.OrderByDescending(x => x.DateOfPublishing).ToList();
            if(property == "rating" && Mode == property)
                films.OrderByDescending(x => x.Rating).ToList();
            if (property == "title" && Mode == property)
                films.OrderByDescending(x => x.Title).ToList();
            if (property == "base" && Mode == property)
                films = GetAll().ToList();
            Mode = property;            
            int start = page * 10;
            if (start >= films.Count())
                start = films.Count() - 11;
            if (start < 0)
                start = 0;
            int end = start + 10;
            if (end >= films.Count())
                end = films.Count() - 1;
            if (end < 0)
                end = 0;
            return films.GetRange(start, end);
        }
        public List<FilmDTO> SortedFilter(FilterOptions options)
        {            
            List<FilmDTO> fs = new List<FilmDTO>();
            foreach(var film in films)
            {
                List<string> genres = GetGenres(film.Id).Select(x => x.Name).ToList();
                if (film.DateOfPublishing >= options.DateTop 
                    && film.DateOfPublishing <= options.DateLast
                    && film.Rating >= options.RatingTop
                    && film.Rating <= options.RatingLast
                    && genres.Contains(options.Genre))
                    fs.Add(film);
            }
            return fs;
        }
    }
}

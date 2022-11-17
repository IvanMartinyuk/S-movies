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
        FilmContext context;
        public FilmService(FilmContext context)
        {
            this.context = context;
            Repository = new FilmRepository(context);
            MapperConfiguration config = new MapperConfiguration(con =>
            {
                con.CreateMap<Film, FilmDTO>().ReverseMap();
                con.CreateMap<Actor, ActorDTO>().ReverseMap();
                con.CreateMap<Writer, WriterDTO>().ReverseMap();
                con.CreateMap<Director, DirectorDTO>().ReverseMap();
                con.CreateMap<Genre, GenreDTO>().ReverseMap();
            });
            Mapper = new Mapper(config);
        }
        public override async Task AddAsync(FilmDTO filmdto)
        {
            Film film = Mapper.Map<FilmDTO, Film>(filmdto);
            film.Actors.Clear();
            film.Writers.Clear();
            film.Directors.Clear();
            film.Genres.Clear();
            await Repository.AddAsync(film);
            await Repository.SaveChanges();
            film = ((FilmRepository)Repository).GetFull(film);
            film.Actors = new List<Actor>();
            film.Writers = new List<Writer>();
            film.Directors = new List<Director>();
            film.Genres = new List<Genre>();
            foreach (ActorDTO actor in filmdto.Actors)
                film.Actors.Add(context.Actors.FirstOrDefault(x => x.Id == actor.Id));
            foreach (WriterDTO produce in filmdto.Writers)
                film.Writers.Add(context.Writers.FirstOrDefault(x => x.Id == produce.Id));
            foreach (DirectorDTO director in filmdto.Directors)
                film.Directors.Add(context.Directors.FirstOrDefault(x => x.Id == director.Id));
            foreach (GenreDTO genre in filmdto.Genres)
                film.Genres.Add(context.Genres.FirstOrDefault(x => x.Id == genre.Id));
            await Repository.UpdateAsync(film);
            await Repository.SaveChanges();
        }
        public List<Actor> GetActors(int filmId) => ((FilmRepository)Repository).GetActors(filmId);
        public List<Writer> GetWriters(int filmId) => ((FilmRepository)Repository).GetWriters(filmId);
        public List<Genre> GetGenres(int filmId) => ((FilmRepository)Repository).GetGenres(filmId);
        public List<Director> GetDirectors(int filmId) => ((FilmRepository)Repository).GetDirectors(filmId);
        public List<Selection> GetSelections(int filmId) => ((FilmRepository)Repository).GetSelections(filmId);
        public Company GetCompany(int filmId) => ((FilmRepository)Repository).GetCompany(filmId);
        public List<CommentDTO> GetComments(int filmId) => Mapper.Map<List<Comment>, List<CommentDTO>>
                                                            (((FilmRepository)Repository).GetComments(filmId));
        public List<string> GetScreenshots(int filmId) => ((FilmRepository)Repository).GetSCreenshots(filmId);
        public int GetCount()
        {
            return context.Films.Count();
        }
        public List<FilmDTO> Search(string title, int page = 0)
        {
            return Mapper.Map<List<Film>, List<FilmDTO>>(((FilmRepository)Repository).Search(title, page));
        }
        public List<FilmDTO> GetSortedPage(FilterOptions options) => Mapper.Map<List<Film>, List<FilmDTO>>(
                                                                                        ((FilmRepository)Repository)
                                                                                        .GetSortedFilter(options));
    }
}

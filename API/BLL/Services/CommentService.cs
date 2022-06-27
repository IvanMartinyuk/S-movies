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
    public class CommentService : GenericService<CommentDTO, Comment>
    {
        readonly FilmContext context;

        public CommentService(FilmContext context)
        {
            this.context = context;
            Repository = new CommentRepository(context);
        }
        public override Task AddAsync(CommentDTO entity)
        {
            Comment com = Mapper.Map<CommentDTO, Comment>(entity);
            com.Author = context.Users.FirstOrDefault(x => x.Id == com.Id);            
            com.CommentedFilm = context.Films.FirstOrDefault(x => x.Id == com.CommentedFilmId);
            context.Coments.Add(com);
            return context.SaveChangesAsync();
        }
        public Task AddAsync(CommentDTO entity, int commToId)
        {
            Comment com = Mapper.Map<CommentDTO, Comment>(entity);
            com.Author = context.Users.FirstOrDefault(x => x.Id == com.Id);
            com.CommentedFilm = context.Films.FirstOrDefault(x => x.Id == com.CommentedFilmId);
            context.Coments.Add(com);
            context.SaveChanges();
            com = context.Coments.FirstOrDefault(x => x.Text == entity.Text
                                                && x.CommentedFilmId == com.CommentedFilmId
                                                && x.AuthorId == com.AuthorId);
            Comment commTo = context.Coments.FirstOrDefault(x => x.Id == commToId);
            com.ComentsTo.Add(commTo);
            commTo.ComentsBy.Add(com);
            context.Coments.Update(com);
            context.Coments.Update(commTo);
            return context.SaveChangesAsync();
        }
        public List<CommentDTO> GetCommentsBy(int id)
        {
            CommentRepository repos = (CommentRepository)Repository;
            return Mapper.Map<List<Comment>, List<CommentDTO>>(repos.GetCommentsBy(id));
        }
        public List<CommentDTO> GetCommentsTo(int id)
        {
            CommentRepository repos = (CommentRepository)Repository;
            return Mapper.Map<List<Comment>, List<CommentDTO>>(repos.GetCommentsTo(id));
        }
    }
}

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
    public class WriterService : GenericService<WriterDTO, Writer>
    {
        public WriterService(FilmContext context)
        {
            Repository = new WriterRepository(context);
        }
        public List<Film> GetFilms(int id) => ((WriterRepository)Repository).GetFilms(id);
        public List<WriterDTO> Search(string name) => Mapper.Map<List<Writer>, List<WriterDTO>>(((WriterRepository)Repository).Search(name));
    }
}

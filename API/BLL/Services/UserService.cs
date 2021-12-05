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
    public class UserService : GenericService<UserDTO, User>
    {
        public UserService(FilmContext context)
        {
            Repository = new UserRepository(context);
        }
        public List<Selection> GetSelections(int id) => ((UserRepository)Repository).GetSelections(id);
    }
}

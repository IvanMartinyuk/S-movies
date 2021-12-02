﻿using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL.Repositories
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(FilmContext context) : base(context) { }
    }
}

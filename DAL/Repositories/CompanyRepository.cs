using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class CompanyRepository : GenericRepository<Company>
    {
        public CompanyRepository(FilmContext context) : base(context)
        {

        }
    }
}

using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL.Repositories
{
    public class SelectionRepository : GenericRepository<Selection>
    {
        public SelectionRepository(FilmContext context) : base(context) 
        { 
        }
    }
}

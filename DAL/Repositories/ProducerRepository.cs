using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class ProducerRepository : GenericRepository<Producer>
    {
        public ProducerRepository(FilmContext context) : base(context)
        {

        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    public class Producer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public virtual IEnumerable<Film> Films { get; set; }
    }
}

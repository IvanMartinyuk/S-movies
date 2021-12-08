using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    [Serializable]
    public class Film
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Rating { get; set; }
        public DateTime DateOfPublishing { get; set; }
        public string Description { get; set; }
        public virtual IEnumerable<Actor> Actors { get; set; }
        public virtual IEnumerable<Genre> Genres { get; set; }
        public virtual IEnumerable<Producer> Producers { get; set; }
        public virtual IEnumerable<Selection> Selections { get; set; }
        public virtual IEnumerable<Director> Directors { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
    }
}

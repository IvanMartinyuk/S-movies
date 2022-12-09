using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    [Serializable]
    public class Selection
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public double Rating { get; set; }
        public int RatingVotes { get; set; }
        public string Poster { get; set; }
        public string Description { get; set; }
        public virtual List<Film> Films { get; set; } = new List<Film>();
    }
}

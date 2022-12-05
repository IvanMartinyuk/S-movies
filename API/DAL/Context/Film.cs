using DataAnnotationsExtensions;
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
        public string ImdbId { get; set; }
        public string Title { get; set; }
        [Max(10)]
        public double ImdbRating { get; set; }
        public int ImdbRatingVotes { get; set; }
        [Max(10)]
        public double LocalRating { get; set; }
        public int LocalRatingVotes { get; set; }
        public DateTime DateOfPublishing { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string TrailerUrl { get; set; }
        public virtual List<Screenshot> Screenshots { get; set; }
        public virtual List<Actor> Actors { get; set; }
        public virtual List<Genre> Genres { get; set; }
        public virtual List<Writer> Writers { get; set; }
        public virtual List<Selection> Selections { get; set; }
        public virtual List<Director> Directors { get; set; }
    }
}

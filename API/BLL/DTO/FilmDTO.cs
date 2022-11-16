using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    [Serializable]
    public class FilmDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DateOfPublishing { get; set; }
        public string Description { get; set; }
        public double ImdbRating { get; set; }
        public double LocalRating { get; set; }
        public string Image { get; set; }
        public virtual List<ScreenshotDTO> Screenshots { get; set; }
        public virtual List<ActorDTO> Actors { get; set; }
        public virtual List<GenreDTO> Genres { get; set; }
        public virtual List<WriterDTO> Writers { get; set; }
        public virtual List<DirectorDTO> Directors { get; set; }
        public int CompanyId { get; set; }
    }
}

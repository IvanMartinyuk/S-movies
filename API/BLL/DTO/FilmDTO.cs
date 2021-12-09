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
        public double Rating { get; set; }
        public string Image { get; set; }
        public int CompanyId { get; set; }
    }
}

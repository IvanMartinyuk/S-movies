using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    [Serializable]
    public class Screenshot
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int FilmId { get; set; }
        public Film Film { get; set; }
    }
}

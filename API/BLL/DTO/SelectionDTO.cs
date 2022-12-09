using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    [Serializable]
    public class SelectionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public double Rating { get; set; }
        public int RatingVotes { get; set; }
        public string Poster { get; set; }
        public string Description { get; set; }
    }
}

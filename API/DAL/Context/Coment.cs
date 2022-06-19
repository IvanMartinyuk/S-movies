using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Context
{
    public class Coment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public virtual User Author { get; set; }
        public virtual List<Coment> ComentsTo { get; set; }
        public virtual List<Coment> ComentsBy { get; set; }
    }
}

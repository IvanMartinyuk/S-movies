using System;
using System.Collections.Generic;

namespace FilmsSpeedRunAPI.Config
{
    [Serializable]
    public class SelectionBody
    {
        public int SelId { get; set; }
        public List<int> FilmIds { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Models
{
    public class SeriesSeasons
    {
        public int SeriesId { get; set; }
        public int AiredSeason { get; set; }
        public int AiredEpisodes { get; set; }

        public int Id { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class UserSeriesDTO
    {
        public int SeriesId { get; set; }
        public Guid UserId { get; set; }
        public int CurrentSeason { get; set; }
        public int CurrentEpisode { get; set; }
    }
}

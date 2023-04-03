using System;
using System.Collections.Generic;

#nullable disable

namespace IvyLakes.Models
{
    public partial class SeriesSeason
    {
        public int SeriesId { get; set; }
        public int AiredSeason { get; set; }
        public int AiredEpisodes { get; set; }
        public int Id { get; set; }

        public virtual TvSeries Series { get; set; }
    }
}

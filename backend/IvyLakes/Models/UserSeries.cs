using System;
using System.Collections.Generic;

#nullable disable

namespace IvyLakes.Models
{
    public partial class UserSeries
    {
        public int SeriesId { get; set; }
        public Guid UserId { get; set; }
        public int? CurrentSeason { get; set; }
        public int? CurrentEpisode { get; set; }

        public virtual TvSeries Series { get; set; }
        public virtual User User { get; set; }
    }
}

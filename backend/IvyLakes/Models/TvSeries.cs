using System;
using System.Collections.Generic;

#nullable disable

namespace IvyLakes.Models
{
    public partial class TvSeries
    {
        public TvSeries()
        {
            Comments = new HashSet<Comment>();
            Images = new HashSet<Image>();
            SeriesSeasons = new HashSet<SeriesSeason>();
            UserSeries = new HashSet<UserSeries>();
        }

        public int SeriesId { get; set; }
        public string SeriesTitle { get; set; }
        public int YearReleased { get; set; }
        public string ImdbRating { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public string StreamingPlatform { get; set; }
        public string SeriesImageUrl { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<SeriesSeason> SeriesSeasons { get; set; }
        public virtual ICollection<UserSeries> UserSeries { get; set; }
    }
}

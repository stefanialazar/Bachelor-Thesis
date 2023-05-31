using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class SeriesDTO
    {
        public string SeriesTitle { get; set; }
        public int YearReleased { get; set; }
        public string ImdbRating { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public string StreamingPlatform { get; set; }
        public string SeriesImageUrl { get; set; }
    }
}

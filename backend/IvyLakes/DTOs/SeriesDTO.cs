using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.DTOs
{
    public class SeriesDTO
    {
        public int SeriesId { get; set; }
        public string SeriesTitle { get; set; }
        public int YearReleased { get; set; }
        public string IMDBRating { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public string StreamingPlatform { get; set; }
        public string SeriesImageURL { get; set; }
    }
}

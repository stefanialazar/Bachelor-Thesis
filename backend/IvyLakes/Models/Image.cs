using System;
using System.Collections.Generic;

#nullable disable

namespace IvyLakes.Models
{
    public partial class Image
    {
        public int ImageId { get; set; }
        public string ImageUrl { get; set; }
        public int SeriesId { get; set; }

        public virtual TvSeries Series { get; set; }
    }
}

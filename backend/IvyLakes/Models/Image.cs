using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IvyLakes.Models
{
    public class Image
    {
        public int ImageID { get; set; }
        public string ImageURL { get; set; }
        public int SeriesID { get; set; }
    }
}

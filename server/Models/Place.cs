using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace place.Models
{
    public class Place
    {
        public string Name { get; set; }
        public string Address { get; set; }

        public ICollection<Business> Businesses { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Place
    { 
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int businessID { get; set; }

        public Business Business { get; set; }
    }
}

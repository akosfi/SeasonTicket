using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Business
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int userID { get; set; }

        public ICollection<Place> Places { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public User User { get; set; }
        
    }
}

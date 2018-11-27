using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Ticket
    {
        public int ID { get; set; }
        public String Name { get; set; }
        public int Price { get; set; }
        public String Category { get; set; }
        public int DaysOfValidity { get; set; }
        public int OccasionNumber { get; set; }
        public Boolean IsOccasional { get; set; }
        public Boolean IsActive { get; set; }
        public int businessID { get; set; }

        public ICollection<Transaction> Transactions { get; set; }
        public Business Business { get; set; }
    }
}

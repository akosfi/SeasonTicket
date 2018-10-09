using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Transaction
    {
        public int ID { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int OccasionNumber { get; set; }
        public int userID { get; set; }
        public int ticketID { get; set; }

        public User User { get; set; }
        public Ticket Ticket { get; set; }
    }
}

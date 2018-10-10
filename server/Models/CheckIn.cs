using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class CheckIn
    {
        public int ID { get; set; }
        public DateTime CheckInDate { get; set; }

        public int transactionID { get; set; }
        public Transaction Transaction { get; set; }
    }
}

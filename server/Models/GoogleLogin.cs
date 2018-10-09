using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class GoogleLogin
    {
        public int ID { get; set; }
        public string GoogleID { get; set; }

        public int userID { get; set; }
        public User User { get; set; }
    }
}

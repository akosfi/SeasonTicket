using System;
using System.Collections.Generic;

namespace server.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Email { get; set; }
        //public string Address { get; set; }
        //public string Fullname { get; set; }
        public DateTime BirthDate { get; set; }
        public string ProfilePic { get; set; }
        public int Credits { get; set; }

        public GoogleLogin GoogleLogin { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Business> Businesses { get; set; }

    }
}

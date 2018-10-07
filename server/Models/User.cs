using System;
using System.Collections.Generic;

namespace server.Models
{
    public enum AuthenticationType{
        Regular,
        Google, //ezt valósítjuk meg
        Facebook
    }
    public class User
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
        public AuthenticationType LoginType { get; set; }
        public string LoginID { get; set; }

        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Business> Businesses { get; set; }

    }
}

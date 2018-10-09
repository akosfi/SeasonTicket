using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
namespace server.Data
{
    public static class DbSeeder
    {
        public static void InitDB(TicketContext _context)
        {
            _context.Database.EnsureCreated();

            if (_context.Users.Any())
            {
                return;
            }
            /*Users*/
            var user1 = new User { Email = "asd@asd.com", BirthDate = new DateTime(1992, 02, 1), ProfilePic = "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg" };
            var user2 = new User { Email = "fiakos1997@gmail.com", BirthDate = new DateTime(1920, 12, 13), ProfilePic = "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg" };
            var user3 = new User { Email = "ruszinkom@nemtudomazemailcimed.com", BirthDate = new DateTime(1993, 12, 13), ProfilePic = "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg" };
            _context.Users.Add(user1);
            _context.Users.Add(user2);
            _context.Users.Add(user3);
            _context.SaveChanges();

            /*Businesses*/
            var busi1 = new Business { Name = "Pro Gym Győr", Email = "contact@progym.hu", userID = user1.ID };
            var busi2 = new Business { Name = "Budapest Főkönyvtár", Email = "szabokkkk@gmail.com", userID = user2.ID };
            _context.Businesses.Add(busi1);
            _context.Businesses.Add(busi2);
            _context.SaveChanges();

            /*Tickets*/
            var ticket1 = new Ticket { Price = 500, DaysOfValidity = 5, OccasionNumber = 30, IsActive = true, businessID = busi1.ID };
            var ticket2 = new Ticket { Price = 1500, DaysOfValidity = 365, OccasionNumber = 30, IsActive = true, businessID = busi1.ID };
            var ticket3 = new Ticket { Price = 22500, DaysOfValidity = 200, OccasionNumber = -1, IsActive = false, businessID = busi2.ID };
            _context.Tickets.Add(ticket1);
            _context.Tickets.Add(ticket2);
            _context.Tickets.Add(ticket3);
            _context.SaveChanges();



        }
    }
}

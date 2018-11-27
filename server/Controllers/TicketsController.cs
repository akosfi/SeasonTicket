using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using Microsoft.AspNetCore.Http;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TicketsController : Controller
    {
        private readonly TicketContext _context;

        public TicketsController(TicketContext context)
        {
            _context = context;
        }
        // GET api/tickets
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Tickets.Where(t => t.IsActive));
        }

        // GET api/tickets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int? id)
        {
            if (id == null)
                return NotFound("404");
            
            var ticket = await _context.Tickets.SingleOrDefaultAsync(m => m.ID == id);

            if (ticket == null)
                return NotFound("404");
            
            return Ok(ticket);
        }

        // GET
        [HttpGet("buy/{id}")]
        public async Task<IActionResult> BuyTicket(int id)
        {
            if (!HttpContext.Session.Keys.Contains("userId") || HttpContext.Session.GetString("userId").Equals(""))
            {
                return Ok("404");
            }
            
            int userId = Int32.Parse(HttpContext.Session.GetString("userId"));
            
            User activeUser = await _context.Users.SingleOrDefaultAsync(u => u.ID == userId);
            

            Ticket ticketToBuy = await _context.Tickets.SingleOrDefaultAsync(m => m.ID == id);

            if (ticketToBuy == null)
                return NotFound("404");

            if(activeUser.Credits < ticketToBuy.Price)
            {
                return Ok("404");
            }

            Transaction ticketTransaction = 
                new Transaction { OccasionNumber = ticketToBuy.OccasionNumber, RegistrationDate = DateTime.Now, ticketID = ticketToBuy.ID, userID = activeUser.ID };

           

            await _context.Transactions.AddAsync(ticketTransaction);

            activeUser.Credits -= ticketToBuy.Price;

            await _context.SaveChangesAsync();

            return Ok("200");
        }
        // POST api/tickets
        [HttpPost]
        public async Task<IActionResult> Post(Ticket ticket)
        {
            await _context.Tickets.AddAsync(ticket);
            await _context.SaveChangesAsync();
            return Ok(ticket);
        }


        [HttpGet("filter/")]
        public IActionResult Filter(string name, int? priceMin, int? priceMax, bool? isOccasional, string category)
        {
            IQueryable<Ticket> result = _context.Tickets;
            

            if (name != "" && name != null) result = result.Where(t => t.Name.Contains(name));
            if (priceMin != null) result = result.Where(t => t.Price >= priceMin);
            if (priceMax != null) result = result.Where(t => t.Price <= priceMax);
            if (isOccasional != null) result = result.Where(t => t.IsOccasional == isOccasional);
            if (category != "" && category != null) result = result.Where(t => t.Category == category);


            return Ok(result);
        }
        [HttpGet("check/{userId}")]
        public async Task<IActionResult> Check(int userId, int userTicketId)
        {
            
            Transaction userTicket = await _context.Transactions.SingleOrDefaultAsync(t => t.ID == userTicketId);
            Ticket isValidTicket = await _context.Tickets.Include(t => t.Business).SingleOrDefaultAsync(t => t.ID == userTicket.ticketID);
           
            if (!HttpContext.Session.Keys.Contains("userId") || HttpContext.Session.GetString("userId").Equals(""))
            {
                return Ok("404");
            }
            
            
            if (isValidTicket.Business.userID != Int32.Parse(HttpContext.Session.GetString("userId")))
            {
                return Ok("404");
            }
            
            if (userTicket == null || userTicket.userID != userId || isValidTicket == null)
            {
                return Ok("404");
            }
            
            if (isValidTicket.IsOccasional)
            {
                if(userTicket.OccasionNumber <= 0)
                {
                    return Ok("404");
                }
                userTicket.OccasionNumber -= 1;
                _context.SaveChanges();
                return Ok("200");
            }
            else
            {
                DateTime expiryDate = userTicket.RegistrationDate.AddDays(isValidTicket.DaysOfValidity);
                if(DateTime.Now.Date >= expiryDate)
                {
                    return Ok("404");
                }
                return Ok("200");
            }
        }
        //https://localhost:44306/api/tickets/check/3?userTicketID=2

        // PUT api/tickets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Ticket ticket)
        {
            Ticket toUpdate = await _context.Tickets.SingleOrDefaultAsync(t => t.ID == id);

            if (toUpdate == null)
                return NotFound("404");

            if (ticket.IsActive != toUpdate.IsActive) toUpdate.IsActive = ticket.IsActive;
            if (ticket.OccasionNumber != toUpdate.OccasionNumber) toUpdate.OccasionNumber = ticket.OccasionNumber;
            if (ticket.Price != toUpdate.Price) toUpdate.Price = ticket.Price;
            if (ticket.DaysOfValidity != toUpdate.DaysOfValidity) toUpdate.DaysOfValidity = ticket.DaysOfValidity;

            await _context.SaveChangesAsync();
            
            return Ok("200");
        }

        // DELETE api/tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            Ticket ticket = await _context.Tickets.SingleOrDefaultAsync(t => t.ID == id);
            if(ticket == null)
                return NotFound("404");

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return Ok("200");
        }
    }
}

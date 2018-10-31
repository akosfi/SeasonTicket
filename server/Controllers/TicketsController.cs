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
            return Ok(_context.Tickets);
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
        [HttpGet("{id}/buy")]
        public async Task<IActionResult> BuyTicket(int id)
        {
            //User id sessionbol lesz?
            User temporaryUser = _context.Users.First();
            //------

            Ticket ticketToBuy = await _context.Tickets.SingleOrDefaultAsync(m => m.ID == id);

            if (ticketToBuy == null)
                return NotFound("404");

            Transaction ticketTransaction = 
                new Transaction { OccasionNumber = ticketToBuy.OccasionNumber, RegistrationDate = DateTime.Now, ticketID = ticketToBuy.ID, userID = temporaryUser.ID };

            await _context.Transactions.AddAsync(ticketTransaction);
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
            
            /*
            t.ID = id;
            _context.Tickets.Attach(t);
            _context.Entry(t).Property(s => s.Price).IsModified = true;
            _context.SaveChanges();
            */
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

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
            {
                return NotFound();
            }
            var ticket = await _context.Tickets.SingleOrDefaultAsync(m => m.ID == id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        // POST api/tickets
        [HttpPost]
        public IActionResult Post(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            _context.SaveChanges();
            return Ok(ticket);
        }

        // PUT api/tickets/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Ticket t)
        {
            t.ID = id;
            _context.Tickets.Attach(t);
            _context.Entry(t).Property(s => s.Price).IsModified = true;
            _context.SaveChanges();

        }

        // DELETE api/tickets/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int? id)
        {
            Ticket ticket = (Ticket)_context.Tickets.Where(t => t.ID == id).First();
            if(ticket == null)
            {
                return NotFound("not found");
            }
            _context.Tickets.Remove(ticket);
            _context.SaveChanges();

            return Ok("success");
        }
    }
}

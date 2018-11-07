using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TransactionsController : Controller
    {
        private readonly TicketContext _context;

        public TransactionsController(TicketContext context)
        {
            _context = context;
        }
        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            List<JObject> ret = new List<JObject>();
            //JObject ret = new JObject();
            foreach(Transaction t in _context.Transactions.Include(t=>t.Ticket).Where(t => t.userID == userId))
            {
                JObject tranEntry = new JObject();
                tranEntry.Add("id", t.ID);
                tranEntry.Add("registrationDate", t.RegistrationDate);
                tranEntry.Add("occasionNumber", t.OccasionNumber);
                tranEntry.Add("name", t.Ticket.Name);
                tranEntry.Add("daysOfValidity", t.Ticket.DaysOfValidity);
                tranEntry.Add("isOccasional", t.Ticket.IsOccasional);
                ret.Add(tranEntry);
            }
            return Ok(ret.ToArray());
        }
    }
}
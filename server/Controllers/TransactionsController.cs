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
        [HttpGet]
        public IActionResult Get()
        {
            List<JObject> ret = new List<JObject>();
            int userId = Int32.Parse(HttpContext.Session.GetString("userId"));
            foreach (Transaction t in _context.Transactions.Include(t => t.Ticket).Where(t => t.userID == userId))
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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            int userId = Int32.Parse(HttpContext.Session.GetString("userId"));
            JObject ret = new JObject();
            Transaction transaction = _context.Transactions.Include(t => t.Ticket).Include(t => t.Ticket.Business).SingleOrDefault(t => t.ID == id && t.userID == userId);

            ret.Add("id", transaction.ID);
            ret.Add("registrationDate", transaction.RegistrationDate);
            ret.Add("occasionNumber", transaction.OccasionNumber);
            ret.Add("name", transaction.Ticket.Name);
            ret.Add("daysOfValidity", transaction.Ticket.DaysOfValidity);
            ret.Add("isOccasional", transaction.Ticket.IsOccasional);
            ret.Add("price", transaction.Ticket.Price);
            ret.Add("businessName", transaction.Ticket.Business.Name);


            string makeQRcodeURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + "https://seasonticket.azurewebsites.net/api/tickets/check/" + HttpContext.Session.GetString("userId") + "?userTicketId=" + transaction.ID;
            ret.Add("qrURL", makeQRcodeURL);
            return Ok(ret);
        }
    }
}
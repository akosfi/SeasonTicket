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
    public class BusinessesController : Controller
    {
        private readonly TicketContext _context;

        public BusinessesController(TicketContext context)
        {
            _context = context;
        }

        // GET api/businesses
        [HttpGet]
        public IActionResult Get()
        { 
            return Ok(_context.Businesses);
        }

        //GET api/business/user
        [HttpGet("user")]
        public IActionResult GetForUser()
        {
            if (!HttpContext.Session.Keys.Contains("userId") || HttpContext.Session.GetString("userId").Equals(""))
            {
                return Ok("404");
            }

            int userId = Int32.Parse(HttpContext.Session.GetString("userId"));

            var businesses = _context.Businesses.Where(b => b.userID == userId);
            return Ok(businesses);
        }

        // GET api/businesses/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int? id)
        {
            if (id == null)
                return NotFound("404");

            var business = await _context.Businesses.SingleOrDefaultAsync(m => m.ID == id);

            if (business == null)
                return NotFound("404");

            return Ok(business);
        }

        // POST api/businesses
        [HttpPost]
        public async Task<IActionResult> Post(Business business)
        {
            if (!HttpContext.Session.Keys.Contains("userId") || HttpContext.Session.GetString("userId").Equals(""))
            {
                return Ok("404");
            }
            int userId = Int32.Parse(HttpContext.Session.GetString("userId"));

            business.userID = userId;
            await _context.Businesses.AddAsync(business);
            await _context.SaveChangesAsync();
            return Ok("200");
        }
    }
}
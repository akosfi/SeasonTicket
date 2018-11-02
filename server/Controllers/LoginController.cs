using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : Controller
    {
        private readonly string GOOGLE_TOKEN_VERIFY_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=";
        private readonly TicketContext _context;

        public LoginController(TicketContext context)
        {
            _context = context;
        }

        // GET api/login
        [HttpGet]
        public IActionResult Get()
        {
            if (HttpContext.Session.GetString("userId") != null) {
                return Ok("200");
            }

            return NotFound("404");
        }

        // POST api/login
        [HttpPost]
        public async Task<IActionResult> Post(string tokenId, string googleId)
        {

            //string respons = VerifyGoogleTocenId(tokenId);

            return Ok(tokenId);
        }

        private string VerifyGoogleTocenId(string tokenId)
        {
            using (WebClient client = new WebClient())
            {
                string s = client.DownloadString(GOOGLE_TOKEN_VERIFY_URL + tokenId);
                return s;
            }
        }
    }
}

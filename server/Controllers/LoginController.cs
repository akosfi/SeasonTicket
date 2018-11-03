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
using Newtonsoft.Json.Linq;

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
        public async Task<IActionResult> Post([FromBody] ValidationDataObject vdo)
        {
            JObject reponse = VerifyGoogleTokenId(vdo.TokenId);

            var googleRecord = await _context.GoogleLogins.Include(g => g.User).SingleOrDefaultAsync(g => g.GoogleID == vdo.GoogleId);
            
            if (googleRecord == null)
            {
                User newUser = new User { Email = (String)reponse["email"], ProfilePic = (String)reponse["picture"] };
                await _context.Users.AddAsync(newUser);

                GoogleLogin newGoogleEntry = new GoogleLogin { GoogleID = vdo.GoogleId, userID = newUser.ID };
                await _context.GoogleLogins.AddAsync(newGoogleEntry);

                await _context.SaveChangesAsync();
                return Ok(newUser.ID);
            }
            
            return Ok(googleRecord.User.ID);
            
        }

        private JObject VerifyGoogleTokenId(string tokenId)
        {
            using (WebClient client = new WebClient())
            {
                string s = client.DownloadString(GOOGLE_TOKEN_VERIFY_URL + tokenId);
                return JObject.Parse(s);
            }
        }
    }

    public class ValidationDataObject
    {
        public string TokenId { get; set; }
        public string GoogleId { get; set; }
    }
}

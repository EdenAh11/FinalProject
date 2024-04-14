using Microsoft.AspNetCore.Mvc;
using ProjectData.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class usersController : ControllerBase
    {
        // GET: api/<usersController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Users[]> Get()
        {
            try
            {
                return Ok(UsersDBMock.users.ToArray());
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
        }

        // GET api/<usersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<usersController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<usersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<usersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

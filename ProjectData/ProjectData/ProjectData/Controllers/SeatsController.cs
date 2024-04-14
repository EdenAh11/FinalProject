using Microsoft.AspNetCore.Mvc;
using ProjectData.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        // GET: api/<SeatsController>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Seats[]> Get()
        {
            try
            {
                return Ok(SeatsDBMock.seats.ToArray());
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
        }

        // GET api/<SeatsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SeatsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SeatsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SeatsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

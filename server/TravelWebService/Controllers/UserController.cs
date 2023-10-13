
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using TravelWebService.Model;
using TravelWebService.Services;

namespace TravelWebService.Controller
{
    [ApiController]
    [Route("api/User")]
    public class UserController: ControllerBase
    {
        private readonly UserService _usersService;

        public UserController(UserService usersService) =>
            _usersService = usersService;

        [HttpGet]
        public async Task<List<User>> Get() =>
            await _usersService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var book = await _usersService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public async Task<IActionResult> Post(User newUser)
        {
            try
            {
                await _usersService.CreateAsync(newUser);

                return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
            }   
            
            catch (MongoWriteException ex)
            {
                if (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
                {
                    // Handle the case of a duplicate NIC
                    return BadRequest("User creation failed: Duplicate NIC No.");
                }
                else
                {
                    return StatusCode(500, "An error occurred while creating the user.");
                }
            }
           
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, User updatedUser)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            await _usersService.UpdateAsync(id, updatedUser);

            return Ok("User has been successfully Edited.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            await _usersService.RemoveAsync(id);

            return Ok("User has been successfully deleted.");
        }

    }
}

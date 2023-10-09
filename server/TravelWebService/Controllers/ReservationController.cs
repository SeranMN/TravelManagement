using Microsoft.AspNetCore.Mvc;
using TravelWebService.Model;
using TravelWebService.Services;

namespace TravelWebService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController: ControllerBase
    {
        private readonly ReservationServices _usersService;

        public ReservationController(ReservationServices reservationServices) =>
            _usersService = reservationServices;

        [HttpGet]
        public async Task<List<Reservations>> Get() =>
            await _usersService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Reservations>> Get(string id)
        {
            var book = await _usersService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Reservations newReservation)
        {
            await _usersService.CreateAsync(newReservation);

            return CreatedAtAction(nameof(Get), new { id = newReservation.Id }, newReservation);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Reservations updatedReservation)
        {
            var reservation = await _usersService.GetAsync(id);

            if (reservation is null)
            {
                return NotFound();
            }

            updatedReservation.Id = reservation.Id;

            await _usersService.UpdateAsync(id, updatedReservation);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _usersService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            await _usersService.RemoveAsync(id);

            return NoContent();
        }


    }
}

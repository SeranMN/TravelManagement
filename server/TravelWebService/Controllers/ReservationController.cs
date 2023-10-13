using Microsoft.AspNetCore.Mvc;
using System.Globalization;
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
            DateTime date1 = DateTime.ParseExact(reservation.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            DateTime date = DateTime.Today;
            if (date.AddDays(5) < date1)
            {
                updatedReservation.Id = reservation.Id;

                await _usersService.UpdateAsync(id, updatedReservation);

                return Ok("Reservation has been successfully Edited.");
            }
            else
            {
                return BadRequest("The reservation cannot be deleted because it is less than 5 days away.");
            }


        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {

            var reservation = await _usersService.GetAsync(id);

            if (reservation is null)
            {
                return NotFound();
            }

            DateTime date1 = DateTime.ParseExact(reservation.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            DateTime date = DateTime.Today;
            if (date.AddDays(5) < date1)
            {
                await _usersService.RemoveAsync(id);
            }else
            {
                return BadRequest("The reservation cannot be deleted because it is less than 5 days away.") ;
            }

            

            return NoContent();
        }

        [HttpGet("getUpcoming/{id}")]
        public List<Reservations> getUpcommingRservations(string id)
        {
            var reservations = _usersService.GetByCreatedUser(id).Result.ToList();

            DateTime date = DateTime.Today;
            

            List<Reservations> sortedlist = new List<Reservations>();
            reservations.ForEach(reservation => {
                DateTime date1 = DateTime.ParseExact(reservation.Date,"dd/MM/yyyy", CultureInfo.InvariantCulture);
                if (date < date1)
                {
                    sortedlist.Add(reservation);
                }
            });


            return sortedlist;
        }
        [HttpGet("getHistory/{id}")]
        public List<Reservations> getHistoryRservations(string id)
        {
            var reservations = _usersService.GetByCreatedUser(id).Result.ToList();

            DateTime date = DateTime.Now;

            List<Reservations> sortedlist = new List<Reservations>();
            reservations.ForEach(reservation => {
                DateTime date1 = DateTime.ParseExact(reservation.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                if (date > date1)
                {
                    sortedlist.Add(reservation);
                }
            });


            return sortedlist;
        }

        [HttpGet("getUpcoming/schedule/{id}")]
        public List<Reservations> getUpcommingRservationsBySchedule(string id)
        {
            var reservations = _usersService.GetBySchedule(id).Result.ToList();

            DateTime date = DateTime.Today;

            List<Reservations> sortedlist = new List<Reservations>();
            reservations.ForEach(reservation => {
                DateTime date1 = DateTime.ParseExact(reservation.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                if (date < date1)
                {
                    sortedlist.Add(reservation);
                }
            });


            return sortedlist;
        }


    }
}

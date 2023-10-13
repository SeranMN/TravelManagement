using Microsoft.AspNetCore.Mvc;
using TravelWebService.Model;
using TravelWebService.Services;

namespace TravelWebService.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController: ControllerBase
    {
        private readonly ScheduleService _sheduleService;
        private readonly ReservationServices _reservatinService;

        public ScheduleController(ScheduleService scheduleService, ReservationServices reservatinService)
        {
            _sheduleService = scheduleService;
            _reservatinService = reservatinService;
        }

        [HttpGet]
        public async Task<List<Shedule>> Get() =>
            await _sheduleService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Shedule>> Get(string id)
        {
            var shedule = await _sheduleService.GetAsync(id);

            if (shedule is null)
            {
                return NotFound();
            }

            return shedule;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Shedule Schedule)
        {
            await _sheduleService.CreateAsync(Schedule);

            return CreatedAtAction(nameof(Get), new { id = Schedule.Id }, Schedule);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Shedule updatedSchedule)
        {
            var schedule = await _sheduleService.GetAsync(id);

            if (schedule is null)
            {
                return NotFound();
            }

            updatedSchedule.Id = schedule.Id;

            if(schedule.Status != updatedSchedule.Status)
            {
               var reservation = _reservatinService.GetBySchedule(updatedSchedule.Id);

                if (reservation != null)
                {
                    return BadRequest("There are existing reservations associated with this schedule ");
                }
                else
                {
                    await _sheduleService.UpdateAsync(id, updatedSchedule);

                }
            }
            else
            {
                await _sheduleService.UpdateAsync(id, updatedSchedule);
            }


            return Ok("Schedule has been successfully Edited.");
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _sheduleService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            await _sheduleService.RemoveAsync(id);

            return NoContent();
        }

        [HttpGet("tour")]
        public async Task<List<Shedule>> GetByTour(string from, string to)
        {
            var schedule = await _sheduleService.FindSchedules(from, to);

            return schedule;
        }

    }
}

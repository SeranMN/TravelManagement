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
        //Get All Schedules
        [HttpGet]
        public async Task<List<Shedule>> Get() =>
            await _sheduleService.GetAsync();

        //Get Schedule By id
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

        //Create Schedule
        [HttpPost]
        public async Task<IActionResult> Post(Shedule Schedule)
        {
            await _sheduleService.CreateAsync(Schedule);

            return CreatedAtAction(nameof(Get), Schedule);
        }

        //Update Schedule
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
               var reservation = await _reservatinService.GetBySchedule(updatedSchedule.Id);

                if (reservation.Count > 0)
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

        //Delete Schedule
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var schedule = await _sheduleService.GetAsync(id);

            if (schedule is null)
            {
                return NotFound();
            }

            await _sheduleService.RemoveAsync(id);

            return NoContent();
        }

        //Find shedules by Frm And To
        [HttpGet("tour")]
        public async Task<List<Shedule>> GetByTour(string from, string to)
        {
            var schedule = await _sheduleService.FindSchedules(from, to);

            return schedule;
        }

        //Find Schedules by trainID
        [HttpGet("train/{trainID}")]
        public async Task<List<Shedule>> GetByTrain(string trainID)
        {
            var schedule = await _sheduleService.FindSchedulesByTrain(trainID);

            return schedule;
        }


    }
}

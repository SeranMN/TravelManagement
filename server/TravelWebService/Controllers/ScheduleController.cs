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

        public ScheduleController(ScheduleService scheduleService)
        {
            _sheduleService = scheduleService;
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
            var book = await _sheduleService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            updatedSchedule.Id = book.Id;

            await _sheduleService.UpdateAsync(id, updatedSchedule);

            return NoContent();
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

        [HttpGet("/tour")]
        public async Task<List<Shedule>> GetByTour(string from, string to)
        {
            var schedule = await _sheduleService.FindSchedules(from, to);

            return schedule;
        }

    }
}

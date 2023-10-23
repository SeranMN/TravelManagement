using Microsoft.AspNetCore.Mvc;
using TravelWebService.Model;
using TravelWebService.Services;

namespace TravelWebService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainController: ControllerBase
    {
        private readonly TrainService _TrainService;
        private readonly ScheduleService _ScheduleService;
        private readonly ReservationServices _ReservationServices;

        public TrainController(TrainService TrainService, ScheduleService scheduleService, ReservationServices reservationServices)
        {
            _TrainService = TrainService;
            _ScheduleService = scheduleService;
            _ReservationServices = reservationServices;
        }

        //Get All Trains
        [HttpGet]
        public async Task<List<train>> Get() =>
            await _TrainService.GetAsync();

        //Get Train By Id
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<train>> Get(string id)
        {
            var train = await _TrainService.GetAsync(id);

            if (train is null)
            {
                return NotFound();
            }

            return train;
        }
        //Create Train
        [HttpPost]
        public async Task<IActionResult> Post(train newTrain)
        {
            await _TrainService.CreateAsync(newTrain);

            return CreatedAtAction(nameof(Get), new { id = newTrain.Id }, newTrain);
        }
        //Update Train
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, train updatedTrain)
        {
            var train = await _TrainService.GetAsync(id);

            if (train is null)
            {
                return NotFound();
            }

            updatedTrain.Id = train.Id;

            if(updatedTrain.Status == false)
            {
                var trainSchedules = await _ScheduleService.FindSchedulesByTrain(id);

                foreach (var trainSchedule in trainSchedules)
                {
                    var reservation = await _ReservationServices.GetBySchedule(trainSchedule.Id);
                    if (reservation.Count > 0)
                    {
                        return BadRequest("There is an existing reservation for this train.");
                    }
                   
                }
            }

             await _TrainService.UpdateAsync(id, updatedTrain);

            return Ok();
        }

        //Delete Train
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var train = await _TrainService.GetAsync(id);

            if (train is null)
            {
                return NotFound();
            }

            var trainSchedules = await _ScheduleService.FindSchedulesByTrain(id);

            foreach (var trainSchedule in trainSchedules)
            {
                var reservation = await _ReservationServices.GetBySchedule(trainSchedule.Id);
                if (reservation.Count > 0)
                {
                    return BadRequest("There is an existing reservation for this train schedule.");
                }
            }

            await _TrainService.RemoveAsync(id);

            return Ok();
        }

    }
}

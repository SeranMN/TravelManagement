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

        public TrainController(TrainService TrainService) =>

            _TrainService = TrainService;

        [HttpGet]
        public async Task<List<train>> Get() =>
            await _TrainService.GetAsync();

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

        [HttpPost]
        public async Task<IActionResult> Post(train newTrain)
        {
            await _TrainService.CreateAsync(newTrain);

            return CreatedAtAction(nameof(Get), new { id = newTrain.Id }, newTrain);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, train updatedTrain)
        {
            var train = await _TrainService.GetAsync(id);

            if (train is null)
            {
                return NotFound();
            }

            updatedTrain.Id = train.Id;

            await _TrainService.UpdateAsync(id, updatedTrain);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _TrainService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            await _TrainService.RemoveAsync(id);

            return NoContent();
        }

    }
}

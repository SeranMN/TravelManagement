using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TravelWebService.Model;

namespace TravelWebService.Services
{
    public class ScheduleService
    {
        private readonly IMongoCollection<Shedule> _sheduleCollection;

        public ScheduleService(
            IOptions<UserDatabaseSettings> userDatabaseSettings)
        {
            var mongoClient = new MongoClient(
               userDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                userDatabaseSettings.Value.DatabaseName);

            _sheduleCollection = mongoDatabase.GetCollection<Shedule>(
                userDatabaseSettings.Value.scheduleCollectionName);
        }

        public async Task<List<Shedule>> GetAsync() =>
           await _sheduleCollection.Find(_ => true).ToListAsync();

        public async Task<Shedule?> GetAsync(string id) =>
            await _sheduleCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Shedule newShedule) =>
            await _sheduleCollection.InsertOneAsync(newShedule);

        public async Task UpdateAsync(string id, Shedule updatedShedule) =>
            await _sheduleCollection.ReplaceOneAsync(x => x.Id == id, updatedShedule);

        public async Task RemoveAsync(string id) =>
            await _sheduleCollection.DeleteOneAsync(x => x.Id == id);
    }
}

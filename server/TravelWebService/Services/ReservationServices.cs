using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TravelWebService.Model;

namespace TravelWebService.Services
{
    public class ReservationServices
    {
        private readonly IMongoCollection<Reservations> _reservationCollection;

        public ReservationServices(
            IOptions<UserDatabaseSettings> userDatabaseSettings)
        {
            var mongoClient = new MongoClient(
               userDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                userDatabaseSettings.Value.DatabaseName);

            _reservationCollection = mongoDatabase.GetCollection<Reservations>(
                userDatabaseSettings.Value.resevertionCollectionName);
        }

        public async Task<List<Reservations>> GetAsync() =>
           await _reservationCollection.Find(_ => true).ToListAsync();

        public async Task<Reservations?> GetAsync(string id) =>
            await _reservationCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Reservations newReservation) =>
            await _reservationCollection.InsertOneAsync(newReservation);

        public async Task UpdateAsync(string id, Reservations updatedReservation) =>
            await _reservationCollection.ReplaceOneAsync(x => x.Id == id, updatedReservation);

        public async Task RemoveAsync(string id) =>
            await _reservationCollection.DeleteOneAsync(x => x.Id == id);
    }
}

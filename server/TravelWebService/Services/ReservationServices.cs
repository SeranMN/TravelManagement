using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Globalization;
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
             _reservationCollection.InsertOne(newReservation);

        public async Task UpdateAsync(string id, Reservations updatedReservation) =>
            await _reservationCollection.ReplaceOneAsync(x => x.Id == id, updatedReservation);

        public async Task RemoveAsync(string id) =>
            await _reservationCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<List<Reservations>> GetByCreatedUser (string id) =>
          await _reservationCollection.Find(x => x.CreatedBy == id).ToListAsync();

        public async Task<List<Reservations>> GetBySchedule (string id)
        {
            var reservations = await _reservationCollection.Find(x => x.ScheduleID == id).ToListAsync();

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

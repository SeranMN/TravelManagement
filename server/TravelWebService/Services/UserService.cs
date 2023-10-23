using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TravelWebService.Model;

namespace TravelWebService.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserService(
            IOptions<UserDatabaseSettings> userDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                userDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                userDatabaseSettings.Value.DatabaseName);

            _userCollection = mongoDatabase.GetCollection<User>(
                userDatabaseSettings.Value.userCollectionName);
        }

        public async Task<List<User>> GetAsync() =>
            await _userCollection.Find(_ => true).ToListAsync();

        public async Task<User?> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(User newBook) =>
            await _userCollection.InsertOneAsync(newBook);

        public async Task UpdateAsync(string id, User updatedUser)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, id);
            var update = Builders<User>.Update
                .Set(x => x.Name, updatedUser.Name)
                .Set(x => x.PhoneNumber, updatedUser.PhoneNumber)
                .Set(x => x.Email, updatedUser.Email)
                .Set(x => x.Status, updatedUser.Status);

            await _userCollection.UpdateOneAsync(filter, update);

        }

        public async Task RemoveAsync(string id) =>
            await _userCollection.DeleteOneAsync(x => x.Id == id);

        public async Task Deactivate(string id)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, id);
            var update = Builders<User>.Update.Set(x => x.Status, false);

            await _userCollection.UpdateOneAsync(filter, update);
        }
        
    }
}

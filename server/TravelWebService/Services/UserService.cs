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

        public async Task UpdateAsync(string id, User updatedUser) =>
            await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

        public async Task RemoveAsync(string id) =>
            await _userCollection.DeleteOneAsync(x => x.Id == id);
    }
}

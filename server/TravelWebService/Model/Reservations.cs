using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace TravelWebService.Model
{
    public class Reservations
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("TravelerID")]
        public string Traveler { get; set; } = string.Empty;

        [BsonElement("TrainID")]
        public string Train { get; set; } = string.Empty;

        [BsonElement("Date")]
        public string Date { get; set; } = string.Empty;

        [BsonElement("AravingTime")]
        public string AravingTime { get; set; } = string.Empty;
    }
}

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
        public string TravelerID { get; set; } = string.Empty;

        [BsonElement("TrainID")]
        public string TrainID { get; set; } = string.Empty;

        [BsonElement("ScheduleID")]
        public string ScheduleID { get; set; } = string.Empty;

        [BsonElement("Date")]
        public string Date { get; set; } = string.Empty;

        [BsonElement("ArivingTime")]
        public string ArivingTime { get; set; } = string.Empty;

        [BsonElement("DepatureTime")]
        public string DepatureTime { get; set; } = string.Empty;

        [BsonElement("From")]
        public string From { get; set; } = string.Empty;

        [BsonElement("To")]
        public string To { get; set; } = string.Empty;

        [BsonElement("Count")]
        public string Count { get; set; } = string.Empty;

        [BsonElement("CreatedBy")]
        public string CreatedBy { get; set; } = string.Empty;
    }
}

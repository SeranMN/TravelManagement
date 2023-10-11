using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TravelWebService.Model
{
    public class Shedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("TrainId")]
        public string TrainId { get; set; } = string.Empty;

        [BsonElement("Start")]
        public string Start { get; set; } = string.Empty;

        [BsonElement("End")]
        public string End { get; set; } = string.Empty;

        [BsonElement("ArivingTime")]
        public string ArivingTime { get; set; } = string.Empty;

        [BsonElement("DepatureTime")]
        public string DepatureTime { get; set; } = string.Empty;

        [BsonElement("Intermediate")]
        public List<string> Intermediate { get; set; } = new List<string>();

        [BsonElement("Status")]
        public bool Status { get; set; } = false;
    }
}

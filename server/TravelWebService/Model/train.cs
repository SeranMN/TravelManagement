using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TravelWebService.Model
{
    public class train
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("SeatCount")]
        public int SeatCount { get; set; } = 0;

        [BsonElement("Status")]
        public bool Status { get; set; } = false;





    }
}

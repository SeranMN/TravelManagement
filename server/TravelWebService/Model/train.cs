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

        [BsonElement("From")]
        public string From { get; set; } = string.Empty;

       

    }
}

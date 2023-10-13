using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TravelWebService.Model
{
    public class User
    {
        [BsonId]
        public string Id { get; set; } 

        [BsonElement("Name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("Email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("PhoneNumber")]
        public string PhoneNumber { get; set; } = string.Empty;

        [BsonElement("Role")]
        public string Role { get; set; } = string.Empty;

        [BsonElement("Status")]
        public bool Status { get; set; } = false;
    }
}


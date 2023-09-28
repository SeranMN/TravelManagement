namespace TravelWebService.Model
{
    public class UserDatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;

        public string DatabaseName { get; set; } = string.Empty;

        public string userCollectionName { get; set; } = string.Empty;
   
        public string trainCollectionName { get; set; } = string.Empty;

        public string scheduleCollectionName { get; set; } = string.Empty;

        public string resevertionCollectionName { get; set; } = string.Empty;

    }
}

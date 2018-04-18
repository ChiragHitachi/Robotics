using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Robotics.API.Models;
namespace Robotics.API.Context {
    public class RoboContext {
        private readonly IMongoDatabase _database = null;

        public RoboContext (IOptions<Settings> settings) {
            var client = new MongoClient (settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase (settings.Value.Database);
        }

        public IMongoCollection<Robo> Robos {
            get {
                return _database.GetCollection<Robo> ("robos");
            }
        }

        public IMongoCollection<RoboMoveHistory> MoveHistory {
            get {
                return _database.GetCollection<RoboMoveHistory> ("roboMoveHistory");
            }
        }

    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Robotics.API.Models;

namespace Robotics.API.Repositories
{
    public interface IRoboRepository
    {
         Task<IEnumerable<Robo>> GetAllRobos();
         Task<Robo> GetRobo(string name);
         Task<bool> AddNote(Robo item);
         Task<bool> UpdateNote(string name, Robo item);
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Robotics.API.Models;

namespace Robotics.API.Repositories {
    public interface IRoboRepository {
        Task<IEnumerable<Robo>> GetAllRobos ();
        Task<Robo> GetRobo (string name);
        Task<bool> AddRobo (Robo item);
        Task<bool> UpdateRobo (string name, Robo item);
        Task<IEnumerable<RoboMoveHistory>> GetMoveHistory ();
        Task<RoboMoveHistory> GetMaxMoved ();

        Task<IEnumerable<Robo>> GetRobosFromMoveHistory ();
    }
}
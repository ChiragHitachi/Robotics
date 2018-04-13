using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Robotics.API.Helpers;
using Robotics.API.Models;
using Robotics.API.Repositories;

namespace Robotics.API.Controllers
{
     [Route("api/[controller]")]
    public class RoboController
    {
         private readonly IRoboRepository _roboRepository;

        public RoboController(IRoboRepository roboRepository)
        {
            _roboRepository = roboRepository;
        }

    [NoCache]
        [HttpGet]
        public async Task<IEnumerable<Robo>> Get()
        {
            return await _roboRepository.GetAllRobos();
        }

    
        [NoCache] 
        [HttpGet("{name}")]
        public async Task<Robo> Get(string name)
        {
            return await _roboRepository.GetRobo(name) ?? new Robo();
        }

    }
    }
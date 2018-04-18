using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Robotics.API.Helpers;
using Robotics.API.Helpers;
using Robotics.API.Models;
using Robotics.API.Repositories;

namespace Robotics.API.Controllers {
    [ServiceFilter (typeof (ApiExceptionFilter))]
    [ResponseCache (Location = ResponseCacheLocation.None, NoStore = true)]

    [NoCache]
    [Authorize]
    public class RoboMovementController {
        private readonly IRoboRepository _roboRepository;

        public RoboMovementController (IRoboRepository roboRepository) {
            _roboRepository = roboRepository;
        }

        [HttpGet]
        [Route ("api/[controller]/GetMoveHistory")]
        public async Task<IEnumerable<RoboMoveHistory>> GetMoveHistory () {
            return await _roboRepository.GetMoveHistory ();
        }

        [HttpGet]
        [Route ("api/[controller]/GetMaxMoved")]
        public async Task<RoboMoveHistory> GetMaxMoved () {
            return await _roboRepository.GetMaxMoved ();
        }

        [HttpGet]
        [Route ("api/[controller]/GetRobos")]
        public async Task<IEnumerable<Robo>> GetRobos () {
            return await _roboRepository.GetRobosFromMoveHistory ();
        }
    }
}
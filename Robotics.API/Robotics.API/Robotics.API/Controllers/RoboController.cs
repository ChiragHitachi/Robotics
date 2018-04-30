using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Robotics.API.Helpers;
using Robotics.API.Models;
using Robotics.API.Repositories;

namespace Robotics.API.Controllers {

    [Route ("api/[controller]")]
    [ServiceFilter (typeof (ApiExceptionFilter))]
    [ResponseCache (Location = ResponseCacheLocation.None, NoStore = true)]
    public class RoboController {
        private readonly IRoboRepository _roboRepository;
        private BaseUrl setting;
        public RoboController (IRoboRepository roboRepository, IOptions<BaseUrl> setting, IOptions<AppSetting> appSettings) {
            _roboRepository = roboRepository;
            this.setting = setting.Value;
            
            Console.Write(this.setting.baseUrl.Length);
        }

        [NoCache]
        [HttpGet]
        [Authorize]

        public async Task<IEnumerable<Robo>> Get () {
            
            return await _roboRepository.GetAllRobos ();
        }

        [NoCache]
        [HttpGet ("{name}")]
        [Authorize]
        public async Task<IActionResult> Get (string name) {
            var r = await (_roboRepository.GetRobo (name));
            if (r != null)
                return new OkObjectResult (r);
            else {
                //throw new ApplicationException(name + " not found");
                return new NotFoundObjectResult (name + " not found");
            }
        }

        [Authorize (Policy = "TrainedStaffOnly")]
        [HttpPost]
        public async Task<bool> Post ([FromBody] Robo robo) {
            return await _roboRepository.AddRobo (robo);
        }
    }
}
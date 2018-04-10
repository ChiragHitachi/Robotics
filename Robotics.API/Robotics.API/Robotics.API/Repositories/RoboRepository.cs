using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Robotics.API.Context;
using Robotics.API.Models;

namespace Robotics.API.Repositories
{
    public class RoboRepository
    {
        private readonly RoboContext _context = null;
        public RoboRepository(IOptions<Settings> settings)

        {
            _context = new RoboContext(settings);
        }

        public async Task<IEnumerable<Robo>> GetAllRobos()
        {
            try
            {
                return await _context.Robos.Find(_ => true).ToListAsync();
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

        public async Task<Robo> GetRobo(string name)
        {
            try
            {
                return await _context.Robos
                                .Find(robo => robo.Name == name)
                                .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }        
    }
}
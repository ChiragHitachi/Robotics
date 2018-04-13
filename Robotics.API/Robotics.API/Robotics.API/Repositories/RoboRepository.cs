using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Robotics.API.Context;
using Robotics.API.Models;

namespace Robotics.API.Repositories
{
    public class RoboRepository :IRoboRepository
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

         public async Task<bool> AddNote(Robo item)
        {
            try
            {
                var r = await _context.Robos
                                .Find(robo => robo.Name == item.Name)
                                .FirstOrDefaultAsync();
                if(r != null)
                 return false;

                await _context.Robos.InsertOneAsync(item);
                return true;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }

         public async Task<bool> UpdateNote(string name, Robo item)
        {
            try
            {
                ReplaceOneResult actionResult = await _context.Robos
                                                .ReplaceOneAsync(n => n.Name.Equals(name)
                                                                , item
                                                                , new UpdateOptions { IsUpsert = true });
                return actionResult.IsAcknowledged
                    && actionResult.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
        }    
    }
}
using Microsoft.EntityFrameworkCore;
using SVChVS_Course_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.PlayerServices
{
    public class PlayerService : IPlayerService
    {
        private readonly CourseProjectContext courseProjectContext;

        public PlayerService(CourseProjectContext courseProjectContext)
        {
            this.courseProjectContext = courseProjectContext;
        }

        public async Task<Player> Create(Player entity)
        {
            entity.Id = Guid.NewGuid().ToString();

            await courseProjectContext.Players.AddAsync(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }

        public async Task Delete(string ID)
        {
            courseProjectContext.Players.Remove(await Get(ID));

            await courseProjectContext.SaveChangesAsync();
        }

        public async Task<Player> Get(string ID)
        {
            return await courseProjectContext.Players.FirstOrDefaultAsync(_ => _.Id == ID);
        }

        public async Task<List<Player>> GetAll()
        {
            return await courseProjectContext.Players
                .OrderBy(_ => _.LastName)
                .ToListAsync();
        }

        public async Task<Player> GetByLastNameAsync(string lastName)
        {
            return await courseProjectContext.Players.FirstOrDefaultAsync(_ => _.LastName == lastName);
        }

        public async Task<List<Player>> GetByPositionAsync(string position)
        {
            return await courseProjectContext.Players
                .Where(_ => _.Position == position)
                .OrderBy(_ => _.LastName)
                .ToListAsync();
        }

        public async Task<List<Player>> GetByTeamAsync(string team)
        {
            return await courseProjectContext.Players
                .Where(_ => _.Team == team)
                .OrderBy(_ => _.LastName)
                .ToListAsync();
        }

        public async Task<Player> Update(Player entity)
        {
            await Delete(entity.Id);

            await Create(entity);

            return entity;
        }
    }
}

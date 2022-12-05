using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.PlayersServices
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
            entity.ID = Guid.NewGuid().ToString();

            await courseProjectContext.Players.AddAsync(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }

        public async Task<List<Player>> GetAllAsync()
        {
            return await courseProjectContext.Players.ToListAsync();
        }

        public async Task<Player> GetAsync(string ID)
        {
            return await courseProjectContext.Players.FirstOrDefaultAsync(_ => _.ID == ID);
        }

        public async Task<List<Player>> GetByTeamAsync(string league)
        {
            return await courseProjectContext.Players
                .Where(_ => _.Team == league)
                .OrderBy(_ => _.LastName)
                .ToListAsync();
        }

        public async Task<List<Player>> GetByPositionAsync(string league)
        {
            return await courseProjectContext.Players
                .Where(_ => _.Position == league)
                .OrderBy(_ => _.LastName)
                .ToListAsync();
        }

        public async Task<Player> GetByLastNameAsync(string name)
        {
            return await courseProjectContext.Players.FirstOrDefaultAsync(_ => _.LastName == name);
        }

        public async Task Remove(string ID)
        {
            var forRemove = await GetAsync(ID);

            courseProjectContext.Players.Remove(forRemove);

            await courseProjectContext.SaveChangesAsync();
        }

        public async Task<Player> Update(Player entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }
    }
}

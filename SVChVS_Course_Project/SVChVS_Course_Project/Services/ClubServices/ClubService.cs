using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.ClubServices
{
    public class ClubService : IClubService
    {
        private readonly CourseProjectContext courseProjectContext;

        public ClubService(CourseProjectContext courseProjectContext)
        {
            this.courseProjectContext = courseProjectContext;
        }

        public async Task<Club> Create(Club entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await courseProjectContext.Clubs.AddAsync(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }

        public async Task<List<Club>> GetAllAsync()
        {
            return await courseProjectContext.Clubs.ToListAsync();
        }

        public async Task<Club> GetAsync(string ID)
        {
            return await courseProjectContext.Clubs.FirstOrDefaultAsync(_ => _.ID == ID);
        }

        public async Task<List<Club>> GetByLeagueAsync(string league)
        {
            return await courseProjectContext.Clubs
                .Where(_ => _.League == league)
                .OrderBy(_ => _.Name)
                .ToListAsync();
        }

        public async Task<Club> GetByNameAsync(string name)
        {
            return await courseProjectContext.Clubs.FirstOrDefaultAsync(_ => _.Name == name);
        }

        public async Task<Club> GetByStadiumAsync(string stadium)
        {
            return await courseProjectContext.Clubs.FirstOrDefaultAsync(_ => _.Stadium == stadium);
        }

        public async Task Remove(string ID)
        {
            var forRemove = await GetAsync(ID);

            courseProjectContext.Clubs.Remove(forRemove);

            await courseProjectContext.SaveChangesAsync();
        }

        public async Task<Club> Update(Club entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }
    }
}

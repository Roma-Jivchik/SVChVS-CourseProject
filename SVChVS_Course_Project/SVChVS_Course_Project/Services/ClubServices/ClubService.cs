using System;
using System.Collections.Generic;
using System.Linq;
using SVChVS_Course_Project.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
            entity.Id = Guid.NewGuid().ToString();

            await courseProjectContext.Clubs.AddAsync(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }

        public async Task Delete(string ID)
        {
            courseProjectContext.Clubs.Remove(await Get(ID));

            await courseProjectContext.SaveChangesAsync();
        }

        public async Task<Club> Get(string ID)
        {
            return await courseProjectContext.Clubs.FirstOrDefaultAsync(_ => _.Id == ID);
        }

        public async Task<List<Club>> GetAll()
        {
            return await courseProjectContext.Clubs
                .OrderBy(_ => _.Name)
                .ToListAsync();
        }

        public async Task<List<Club>> GetByLeagueAsync(string league)
        {
            return await courseProjectContext.Clubs
                .Where(_ => _.League == league)
                .OrderBy(_ => _.Name)
                .ToListAsync();
        }

        public async Task<Club> Update(Club entity)
        {
            await Delete(entity.Id);

            await Create(entity);

            return entity;
        }
    }
}

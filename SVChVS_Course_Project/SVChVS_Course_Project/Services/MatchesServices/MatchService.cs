using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.MatchesServices
{
    public class MatchService : IMatchService
    {
        private readonly CourseProjectContext courseProjectContext;

        public MatchService(CourseProjectContext courseProjectContext)
        {
            this.courseProjectContext = courseProjectContext;
        }

        public async Task<Match> Create(Match entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await courseProjectContext.Matches.AddAsync(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }

        public async Task<List<Match>> GetAllAsync()
        {
            return await courseProjectContext.Matches.ToListAsync();
        }

        public async Task<Match> GetAsync(string ID)
        {
            return await courseProjectContext.Matches.FirstOrDefaultAsync(_ => _.ID == ID);
        }

        public async Task<List<Match>> GetByTeamPlayedAsync(string league)
        {
            return await courseProjectContext.Matches
                .Where(_ => _.FirstTeamPlayed == league || _.SecondTeamPlayed == league) 
                .OrderBy(_ => _.Result)
                .ToListAsync();
        }

        public async Task<List<Match>> GetByResultAsync(string league)
        {
            return await courseProjectContext.Matches
                .Where(_ => _.Result == league)
                .OrderBy(_ => _.Result)
                .ToListAsync();
        }

        public async Task Remove(string ID)
        {
            var forRemove = await GetAsync(ID);

            courseProjectContext.Matches.Remove(forRemove);

            await courseProjectContext.SaveChangesAsync();
        }

        public async Task<Match> Update(Match entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }
    }
}

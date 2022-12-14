using Microsoft.EntityFrameworkCore;
using SVChVS_Course_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Match = SVChVS_Course_Project.Models.Match;

namespace SVChVS_Course_Project.Services.MatchServices
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
            entity.Id = Guid.NewGuid().ToString();

            await courseProjectContext.Matches.AddAsync(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }

        public async Task Delete(string ID)
        {
            courseProjectContext.Matches.Remove(await Get(ID));

            await courseProjectContext.SaveChangesAsync();
        }

        public async Task<Match> Get(string ID)
        {
            return await courseProjectContext.Matches.FirstOrDefaultAsync(_ => _.Id == ID);
        }

        public async Task<List<Match>> GetAll()
        {
            return await courseProjectContext.Matches
                .OrderBy(_ => _.Result)
                .ToListAsync();
        }

        public async Task<List<Match>> GetByTeamPlayedAsync(string teamPlayed)
        {
            return await courseProjectContext.Matches
                .Where(_ => _.FirstTeamPlayed == teamPlayed || _.SecondTeamPlayed == teamPlayed)
                .OrderBy(_ => _.Result)
                .ToListAsync();
        }

        public async Task<Match> Update(Match entity)
        {
            await Delete(entity.Id);

            await Create(entity);

            return entity;
        }
    }
}

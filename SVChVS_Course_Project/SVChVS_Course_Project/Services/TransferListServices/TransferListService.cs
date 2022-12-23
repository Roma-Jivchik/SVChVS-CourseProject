using Microsoft.EntityFrameworkCore;
using SVChVS_Course_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.TransferListServices
{
    public class TransferListService : ITransferListService
    {
        private readonly CourseProjectContext courseProjectContext;

        public TransferListService(CourseProjectContext courseProjectContext)
        {
            this.courseProjectContext = courseProjectContext;
        }

        public async Task<TransferList> Create(TransferList entity)
        {
            entity.Id = Guid.NewGuid().ToString();

            await courseProjectContext.TransferLists.AddAsync(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }

        public async Task Delete(string ID)
        {
            courseProjectContext.TransferLists.Remove(await Get(ID));

            await courseProjectContext.SaveChangesAsync();
        }

        public async Task<TransferList> Get(string ID)
        {
            return await courseProjectContext.TransferLists.FirstOrDefaultAsync(_ => _.Id == ID);
        }

        public async Task<List<TransferList>> GetAll()
        {
            return await courseProjectContext.TransferLists
                .OrderBy(_ => _.Price)
                .ToListAsync();
        }

        public async Task<List<TransferList>> GetByTeamAsync(string team)
        {
            return await courseProjectContext.TransferLists
                .Where(_ => _.FromTeam == team || _.ToTeam == team)
                .OrderBy(_ => _.Price)
                .ToListAsync();
        }

        public async Task<TransferList> Update(TransferList entity)
        {
            await Delete(entity.Id);

            await Create(entity);

            return entity;
        }
    }
}

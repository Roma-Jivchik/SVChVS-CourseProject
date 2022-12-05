using Microsoft.EntityFrameworkCore;
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
            entity.ID = Guid.NewGuid().ToString();

            await courseProjectContext.TransferLists.AddAsync(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }

        public async Task<List<TransferList>> GetAllAsync()
        {
            return await courseProjectContext.TransferLists.ToListAsync();
        }

        public async Task<TransferList> GetAsync(string ID)
        {
            return await courseProjectContext.TransferLists.FirstOrDefaultAsync(_ => _.ID == ID);
        }

        public async Task<List<TransferList>> GetByTeamAsync(string league)
        {
            return await courseProjectContext.TransferLists
                .Where(_ => _.FromTeam == league || _.ToTeam == league)
                .OrderBy(_ => _.Price)
                .ToListAsync();
        }

        public async Task<List<TransferList>> GetByLowerPriceAsync(double price)
        {
            return await courseProjectContext.TransferLists
                .Where(_ => _.Price <= price)
                .OrderBy(_ => _.Price)
                .ToListAsync();
        }

        public async Task Remove(string ID)
        {
            var forRemove = await GetAsync(ID);

            courseProjectContext.TransferLists.Remove(forRemove);

            await courseProjectContext.SaveChangesAsync();
        }

        public async Task<TransferList> Update(TransferList entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await courseProjectContext.SaveChangesAsync();

            return entity;
        }
    }
}

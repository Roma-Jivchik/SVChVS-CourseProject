using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.TransferListServices
{
    public interface ITransferListService : IServiceBase<TransferList>
    {
        Task<List<TransferList>> GetByTeamAsync(string team);
        Task<List<TransferList>> GetByLowerPriceAsync(double price);
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.PlayersServices
{
    public interface IPlayerService : IServiceBase<Player>
    {
        Task<Player> GetByLastNameAsync(string lastName);
        Task<List<Player>> GetByPositionAsync(string position);
        Task<List<Player>> GetByTeamAsync(string team);
    }
}

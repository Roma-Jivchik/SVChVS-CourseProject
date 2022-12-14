using SVChVS_Course_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.PlayerServices
{
    public interface IPlayerService : IServiceBase<Player>
    {
        Task<Player> GetByLastNameAsync(string lastName);
        Task<List<Player>> GetByTeamAsync(string team);
        Task<List<Player>> GetByPositionAsync(string position);
    }
}

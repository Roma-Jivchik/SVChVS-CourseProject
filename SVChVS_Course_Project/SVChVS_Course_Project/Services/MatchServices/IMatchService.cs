using SVChVS_Course_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.MatchServices
{
    public interface IMatchService : IServiceBase<Match>
    {
        Task<List<Match>> GetByTeamPlayedAsync(string team);
    }
}

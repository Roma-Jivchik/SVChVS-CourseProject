using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.MatchesServices
{
    public interface IMatchService : IServiceBase<Match>
    {
        Task<List<Match>> GetByTeamPlayedAsync(string team);
        Task<List<Match>> GetByResultAsync(string result);
    }
}

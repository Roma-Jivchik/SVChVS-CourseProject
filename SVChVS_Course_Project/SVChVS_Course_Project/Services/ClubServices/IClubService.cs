using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.ClubServices
{
    public interface IClubService : IServiceBase<Club>
    {
        Task<Club> GetByNameAsync(string name);
        Task<List<Club>> GetByLeagueAsync(string league);
        Task<Club> GetByStadiumAsync(string stadium);
    }
}

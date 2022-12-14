using SVChVS_Course_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SVChVS_Course_Project.Services.ClubServices
{
    public interface IClubService : IServiceBase<Club>
    {
        Task<List<Club>> GetByLeagueAsync(string league);
    }
}

using Microsoft.Extensions.DependencyInjection;
using SVChVS_Course_Project.Services.ClubServices;
using SVChVS_Course_Project.Services.MatchesServices;
using SVChVS_Course_Project.Services.PlayersServices;
using SVChVS_Course_Project.Services.TransferListServices;

namespace SVChVS_Course_Project.Services
{
    public static class DependencyRegistrationService
    {
        public static void RegistrateDependencies(this IServiceCollection services)
        {
            services.AddScoped<IMatchService, MatchService>();
            services.AddScoped<ITransferListService, TransferListService>();
            services.AddScoped<IPlayerService, PlayerService>();
            services.AddScoped<IClubService, ClubService>();
        }
    }
}

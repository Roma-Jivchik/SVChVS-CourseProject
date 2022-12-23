using Microsoft.Extensions.DependencyInjection;
using SVChVS_Course_Project.Services.ClubServices;
using SVChVS_Course_Project.Services.MatchServices;
using SVChVS_Course_Project.Services.PlayerServices;
using SVChVS_Course_Project.Services.TransferListServices;

namespace SVChVS_Course_Project.Services
{
    public static class DependenciesRegistrationService
    {
        public static void Registrate(this IServiceCollection serviceDescriptors)
        {
            serviceDescriptors.AddScoped<IClubService, ClubService>();
            serviceDescriptors.AddScoped<IMatchService, MatchService>();
            serviceDescriptors.AddScoped<ITransferListService, TransferListService>();
            serviceDescriptors.AddScoped<IPlayerService, PlayerService>();
        }
    }
}

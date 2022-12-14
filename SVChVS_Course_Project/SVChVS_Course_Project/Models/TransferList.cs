#nullable disable

namespace SVChVS_Course_Project.Models
{
    public partial class TransferList
    {
        public string Id { get; set; }
        public string PlayerName { get; set; }
        public string FromTeam { get; set; }
        public string ToTeam { get; set; }
        public int Price { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;

#nullable disable

namespace SVChVS_Course_Project.Models
{
    public partial class CourseProjectContext : DbContext
    {
        public CourseProjectContext()
        {
        }

        public CourseProjectContext(DbContextOptions<CourseProjectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Club> Clubs { get; set; }
        public virtual DbSet<Match> Matches { get; set; }
        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<TransferList> TransferLists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost;Database=CourseProject;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Club>(entity =>
            {
                entity.ToTable("Club");

                entity.Property(e => e.Id)
                    .HasMaxLength(200)
                    .HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.History)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.League)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Stadium)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Match>(entity =>
            {
                entity.ToTable("Match");

                entity.Property(e => e.Id)
                    .HasMaxLength(200)
                    .HasColumnName("ID");

                entity.Property(e => e.FirstTeamPlayed)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Result)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.SecondTeamPlayed)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.ToTable("Player");

                entity.Property(e => e.Id)
                    .HasMaxLength(200)
                    .HasColumnName("ID");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Position)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Team)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<TransferList>(entity =>
            {
                entity.ToTable("TransferList");

                entity.Property(e => e.Id)
                    .HasMaxLength(200)
                    .HasColumnName("ID");

                entity.Property(e => e.FromTeam)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.PlayerName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.ToTeam)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

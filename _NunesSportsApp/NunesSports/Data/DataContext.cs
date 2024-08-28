using Microsoft.EntityFrameworkCore;
using NunesSports.Models;

namespace NunesSports.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Produto>()
                .HasIndex(p => p.Nome)
                .IsUnique();
        }
    }
}

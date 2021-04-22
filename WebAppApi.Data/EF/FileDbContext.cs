using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Data.Entities;
using WebAppApi.Data.Extensions;

namespace WebAppApi.Data.EF
{
    public class FileDbContext: DbContext
    {
        public DbSet<File> Files { get; set; }

        public FileDbContext(DbContextOptions options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            modelBuilder.Seed();
            //base.OnModelCreating(modelBuilder);
        }
    }
}

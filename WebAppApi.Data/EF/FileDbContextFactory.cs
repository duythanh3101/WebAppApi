using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.EntityFrameworkCore;

namespace WebAppApi.Data.EF
{
    public class FileDbContextFactory : IDesignTimeDbContextFactory<FileDbContext>
    {
        public FileDbContext CreateDbContext(string[] args)
        {
            //System.Console.WriteLine($"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa {Directory.GetCurrentDirectory()}");
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("FileSolutionDb");
            System.Console.WriteLine($"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb {connectionString}");

            var optionsBuilder = new DbContextOptionsBuilder<FileDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new FileDbContext(optionsBuilder.Options);
            //return new EShopDbContext(null);
        }

    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Data.Entities;

namespace WebAppApi.Data.Extensions
{
    public static class ModelBuilderExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<File>().HasData(
              new File(1, "AAAAA", Enums.FileEnum.File, DateTime.Now, "User1", 0),
              new File(2, "BBBBB", Enums.FileEnum.Folder, DateTime.Now, "User142", 0),
              new File(3, "EEEEE", Enums.FileEnum.File, DateTime.Now, "User13", 0),
              new File(4, "CCCCC", Enums.FileEnum.File, DateTime.Now, "User14", 2),
              new File(5, "DDDDD", Enums.FileEnum.Folder, DateTime.Now, "User15", 2)
              );
        }
    }
}

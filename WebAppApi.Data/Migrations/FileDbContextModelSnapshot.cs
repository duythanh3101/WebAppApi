// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAppApi.Data.EF;

namespace WebAppApi.Data.Migrations
{
    [DbContext(typeof(FileDbContext))]
    partial class FileDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAppApi.Data.Entities.File", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreateBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("datetime2");

                    b.Property<string>("ModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ParentId")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Files");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreateAt = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(2316),
                            CreateBy = "",
                            Modified = new DateTime(2021, 4, 19, 11, 50, 42, 104, DateTimeKind.Local).AddTicks(9954),
                            ModifiedBy = "User1",
                            Name = "AAAAA",
                            ParentId = 0,
                            Type = 1
                        },
                        new
                        {
                            Id = 2,
                            CreateAt = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3805),
                            CreateBy = "",
                            Modified = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3798),
                            ModifiedBy = "User142",
                            Name = "BBBBB",
                            ParentId = 0,
                            Type = 2
                        },
                        new
                        {
                            Id = 3,
                            CreateAt = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3808),
                            CreateBy = "",
                            Modified = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3806),
                            ModifiedBy = "User13",
                            Name = "EEEEE",
                            ParentId = 0,
                            Type = 1
                        },
                        new
                        {
                            Id = 4,
                            CreateAt = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3810),
                            CreateBy = "",
                            Modified = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3809),
                            ModifiedBy = "User14",
                            Name = "CCCCC",
                            ParentId = 2,
                            Type = 1
                        },
                        new
                        {
                            Id = 5,
                            CreateAt = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3813),
                            CreateBy = "",
                            Modified = new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3812),
                            ModifiedBy = "User15",
                            Name = "DDDDD",
                            ParentId = 2,
                            Type = 2
                        });
                });
#pragma warning restore 612, 618
        }
    }
}

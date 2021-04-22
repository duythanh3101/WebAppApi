using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppApi.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Files",
                columns: new[] { "Id", "CreateAt", "CreateBy", "Modified", "ModifiedBy", "Name", "ParentId", "Type" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(2316), "", new DateTime(2021, 4, 19, 11, 50, 42, 104, DateTimeKind.Local).AddTicks(9954), "User1", "AAAAA", 0, 1 },
                    { 2, new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3805), "", new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3798), "User142", "BBBBB", 0, 2 },
                    { 3, new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3808), "", new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3806), "User13", "EEEEE", 0, 1 },
                    { 4, new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3810), "", new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3809), "User14", "CCCCC", 2, 1 },
                    { 5, new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3813), "", new DateTime(2021, 4, 19, 11, 50, 42, 106, DateTimeKind.Local).AddTicks(3812), "User15", "DDDDD", 2, 2 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Files");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddNameandIsOccasionalattributetoTicketstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOccasional",
                table: "Tickets",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Tickets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOccasional",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Tickets");
        }
    }
}

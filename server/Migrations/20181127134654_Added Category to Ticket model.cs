using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddedCategorytoTicketmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Tickets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Tickets");
        }
    }
}

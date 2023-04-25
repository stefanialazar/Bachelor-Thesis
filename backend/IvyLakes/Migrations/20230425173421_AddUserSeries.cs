using Microsoft.EntityFrameworkCore.Migrations;

namespace IvyLakes.Migrations
{
    public partial class AddUserSeries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__UserSerie__serie__6FE99F9F",
                table: "UserSeries");

            migrationBuilder.DropForeignKey(
                name: "FK__UserSerie__userI__70DDC3D8",
                table: "UserSeries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserSeries",
                table: "UserSeries");

            migrationBuilder.DropIndex(
                name: "IX_UserSeries_seriesId",
                table: "UserSeries");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserSeries");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "UserSeries",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "seriesId",
                table: "UserSeries",
                newName: "SeriesId");

            migrationBuilder.RenameColumn(
                name: "currentSeason",
                table: "UserSeries",
                newName: "CurrentSeason");

            migrationBuilder.RenameColumn(
                name: "currentEpisode",
                table: "UserSeries",
                newName: "CurrentEpisode");

            migrationBuilder.RenameIndex(
                name: "IX_UserSeries_userId",
                table: "UserSeries",
                newName: "IX_UserSeries_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserSeries",
                table: "UserSeries",
                columns: new[] { "SeriesId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserSeries_TvSeries_SeriesId",
                table: "UserSeries",
                column: "SeriesId",
                principalTable: "TvSeries",
                principalColumn: "seriesId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSeries_Users_UserId",
                table: "UserSeries",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserSeries_TvSeries_SeriesId",
                table: "UserSeries");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSeries_Users_UserId",
                table: "UserSeries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserSeries",
                table: "UserSeries");

            migrationBuilder.RenameColumn(
                name: "CurrentSeason",
                table: "UserSeries",
                newName: "currentSeason");

            migrationBuilder.RenameColumn(
                name: "CurrentEpisode",
                table: "UserSeries",
                newName: "currentEpisode");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserSeries",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "SeriesId",
                table: "UserSeries",
                newName: "seriesId");

            migrationBuilder.RenameIndex(
                name: "IX_UserSeries_UserId",
                table: "UserSeries",
                newName: "IX_UserSeries_userId");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserSeries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserSeries",
                table: "UserSeries",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserSeries_seriesId",
                table: "UserSeries",
                column: "seriesId");

            migrationBuilder.AddForeignKey(
                name: "FK__UserSerie__serie__6FE99F9F",
                table: "UserSeries",
                column: "seriesId",
                principalTable: "TvSeries",
                principalColumn: "seriesId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK__UserSerie__userI__70DDC3D8",
                table: "UserSeries",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using GamesApplicationApp.Mapping;
using Microsoft.EntityFrameworkCore;

namespace GamesApplicationApp.Endpoints;

public static class GenreEndpoints
{
    public static RouteGroupBuilder MapGenresEndpionts(this WebApplication app)
    {
        var group = app.MapGroup("genres");

        group.MapGet("/", async (GamesStoreContext dbContext) => 
            await dbContext.Genres
            .Select(genre => genre.ToDto())
            .AsNoTracking()
            .ToListAsync()
        );

        return group;
    }
}

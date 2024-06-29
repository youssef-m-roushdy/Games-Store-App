using GamesApplicationApp.Dtos;
using GamesApplicationApp.Entities;
using GamesApplicationApp.Mapping;
using Microsoft.EntityFrameworkCore;

namespace GamesApplicationApp.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";

    public static RouteGroupBuilder MapGamesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("games").WithParameterValidation();

        //GET /games
        group.MapGet("/",async (GamesStoreContext dbContext) => await dbContext.Games
        .Include(game => game.Genre)
        .Select(game => game.ToGameSummaryDto())
        .AsNoTracking()
        .ToListAsync()
        );

        //Get Specific Element
        group.MapGet("/{id}",async (int id, GamesStoreContext dbContext) =>
        {
            Game? game = await dbContext.Games.FindAsync(id);

            return game is null ?
             Results.NotFound() : Results.Ok(game.ToGameDetailsDto());
        }).WithName(GetGameEndpointName);

        group.MapPost("/",async (CreateGameDto newGame, GamesStoreContext dbContext) =>
        {
            Game game = newGame.ToEntity();

            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();
            return Results.CreatedAtRoute(GetGameEndpointName, new { id = game.Id}, game.ToGameDetailsDto() );

        }).WithParameterValidation();

        group.MapPut("/{id}",async (int id, UpdateGameDto updatedGame, GamesStoreContext dbContext) =>
        {
            var existingGame = await dbContext.Games.FindAsync(id);

            if (existingGame is null)
            {
                return Results.NotFound();
            }

            dbContext.Entry(existingGame).CurrentValues
            .SetValues(updatedGame.ToEntity(id));

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{id}",async (int id, GamesStoreContext dbContext) =>
        {
            await dbContext.Games.Where(game => game.Id == id)
            .ExecuteDeleteAsync();

            return Results.NoContent();
        });
        
        return group;
    }
}

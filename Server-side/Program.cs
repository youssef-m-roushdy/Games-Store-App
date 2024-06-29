using GamesApplicationApp;
using GamesApplicationApp.Data;
using GamesApplicationApp.Endpoints;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlite<GamesStoreContext>(connString);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:3000");
                      });
});

var app = builder.Build();

app.MapGamesEndpoints();
app.MapGenresEndpionts();

await app.MigrateDbAsync();

app.UseCors(MyAllowSpecificOrigins);

app.Run();
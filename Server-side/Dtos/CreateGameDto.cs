using System.ComponentModel.DataAnnotations;

namespace GamesApplicationApp.Dtos;
// Removed id because id will provided by the API
public record class CreateGameDto(
    [Required][StringLength(50)] string Name,
    int GenreId,
    [Range(1, 100)] decimal Price,
    DateOnly ReleaseDate
);

﻿using GamesApplicationApp.Dtos;
using GamesApplicationApp.Entities;

namespace GamesApplicationApp.Mapping;

public static class GenreMapping
{
    public static GenreDto ToDto(this Genre genre)
    {
        return new GenreDto(genre.Id, genre.Name);
    }
}

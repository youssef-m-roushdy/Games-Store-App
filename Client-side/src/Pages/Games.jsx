import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Games = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/games");
        const data = await response.json();
        setGames(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  const handleClick = async (id) => {
    try {
      await fetch(`/games/${id}`, {
        method: "DELETE",
      });
      console.log("Deleted");
      setGames((prevGames) => prevGames.filter((game) => game.id !== id));
      // You may want to refetch the games after deletion to update the list
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div class="flex justify-center items-center h-[41.4rem] flex-col">
          <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
          <p className="mt-2">Please wait...</p>
        </div>
      ) : (
        <React.Fragment>
          <h1 className="text-center text-5xl mb-5 mt-5 font-bold text-sky-950">
            Games
          </h1>
            <NavLink to="/games/add-game" className="p-2 rounded-md m-6 ml-20 bg-sky-700 hover:bg-sky-600 text-white">Add Game +</NavLink>
          <table className="min-w-full divide-y divide-gray-200 border-2 mt-8">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {games.map((game) => (
                <tr key={game.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {game.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {game.genre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {game.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <NavLink
                      to={`/games/game-info/${game.id}`}
                      className="px-4 py-2 font-medium text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none focus:shadow-outline-orange active:bg-orange-500 transition duration-150 ease-in-out"
                    >
                      Info
                    </NavLink>

                    <NavLink
                      to={`/games/update-game/${game.id}`}
                      className="ml-2 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleClick(game.id)}
                      className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </React.Fragment>
      )}
    </>
  );
};

export default Games;

import React, { useState, useEffect } from "react";

const Home = () => {
  const [games, setGames] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/games");
        const data = await response.json();
        setGames(data);
        setIsEmpty(data.length === 0); // Check emptiness after updating data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []); // Empty dependency array for initial fetch

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="flex justify-center items-center h-[41.4rem] flex-col">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
          <p className="mt-2">Please wait...</p>
        </div>
      ) : (
        isEmpty ? (
          <h1 className="text-center text-[2rem] font-bold text-sky-950 mt-[4rem]">There are no games in the store</h1>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 border-b-2">
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
                    <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </React.Fragment>
  );
};

export default Home;

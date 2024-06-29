import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateGame() {
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState({
    name: "",
    genreId: "",
    price: "",
    releaseDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/games/${id}`);
        const data = await response.json();
        setGame((prevGame) => ({
          ...prevGame,
          id: data.id,
          name: data.name,
          genreId: data.genreId,
          price: data.price,
          releaseDate: data.releaseDate,
        }));
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGame();

    const fetchGenres = async () => {
      try {
        const response = await fetch("/genres");
        const data = await response.json();
        setGenres(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
    
    
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    })
      .then(() => {
        console.log("Game updated successfully");
        navigate("/games");
      })
      .catch((error) => {
        console.error("Error updating game:", error);
      });
  };

  return (
    <React.Fragment>
      {isLoading ? (
      <div class="flex justify-center items-center h-[41.4rem] flex-col">
        <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
        <p className="mt-2">Please wait...</p>
      </div>      
      ) : (
        <div className="w-screen h-[41.4rem] flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-[30rem] h-[20rem]">
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="text-cyan-500 mb-1 ml-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                required
                value={game.name}
                onChange={(e) => {
                  setGame((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
                className="outline-none border-2 rounded-md p-4 pl-3 border-sky-500 h-[2rem]"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="genreId" className="text-cyan-500 mb-1 ml-1">
                Genre:
              </label>
              <select
                id="genres"
                value={game.genreId}
                onChange={(e) =>
                  setGame((prevState) => ({
                    ...prevState,
                    genreId: e.target.value,
                  }))
                }
                className="text-[1rem] w-[10rem] bg-cyan-500 text-white text-sm rounded-lg outline-none focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 dark:bg-cyan-500 dark:border-cyan-500 dark:placeholder-sky-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
              >
                <option value="" className="text-[1rem] p-2">
                  Choose a genre
                </option>
                {genres.map((genre) => (
                  <option
                    value={genre.id}
                    key={genre.id}
                    className="text-[1rem] p-2"
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="price" className="text-cyan-500 mb-1 ml-1">
                Price:
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                required
                value={game.price}
                onChange={(e) => {
                  setGame((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }));
                }}
                className="outline-none border-2 rounded-md p-4 pl-3 border-sky-500 h-[2rem]"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="releaseDate" className="text-cyan-500 mb-1 ml-1">
                Release Date:
              </label>
              <input
                type="date"
                id="releaseDate"
                required
                value={game.releaseDate}
                onChange={(e) => {
                  setGame((prevState) => ({
                    ...prevState,
                    releaseDate: e.target.value,
                  }));
                }}
                className="outline-none border-2 rounded-md p-4 border-sky-500 h-[2rem] w-[10rem]"
              />
            </div>
            <button className="bg-cyan-500 p-3 rounded-md hover:bg-cyan-400 text-white">
              Update
            </button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}

export default UpdateGame;

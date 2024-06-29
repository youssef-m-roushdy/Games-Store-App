import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddGame = () => {
  const [genres, getGenres] = useState([]);
  const [name, setName] = useState("");
  const [genreId, setGenreId] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const navigate = useNavigate();

  const fetchGenres = async () => {
    try {
      const response = await fetch("/genres");
      const data = await response.json();
      getGenres(data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchGenres();
  const handleSubmit = (e) => {
    e.preventDefault();
    const game = { name, genreId, price, releaseDate };
    console.log(game);
    fetch("/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    })
      .then(() => {
        console.log("new game added");
        navigate("/games");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
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
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              className="text-[1rem] w-[10rem] bg-cyan-500 text-white text-sm rounded-lg outline-none focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-cyan-500 dark:border-cyan-500 dark:placeholder-sky-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
            >
              <option value="" className="text-[1rem] p-2" defaultValue>
                Choose a genre
              </option>
              {genres.map((genre) => (
                <option value={genre.id} key={genre.id} className="text-[1rem] p-2">
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
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
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
              value={releaseDate}
              onChange={(e) => {
                setReleaseDate(e.target.value);
              }}
              className="outline-none border-2 rounded-md p-4 border-sky-500 h-[2rem] w-[10rem]"
            />
          </div>
          <button className="bg-cyan-500 p-3 rounded-md hover:bg-cyan-400 text-white">
            Add Game
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddGame;

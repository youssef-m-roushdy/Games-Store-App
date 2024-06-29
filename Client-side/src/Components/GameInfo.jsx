import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

function GameInfo() {
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState({
    name: "",
    genreId: "",
    price: "",
    releaseDate: "",
  });
  const fetchGame = async () => {
    try {
      const response = await fetch(`/games/${id}`);
      const data = await response.json();
      setGame({
        id: data.id,
        name: data.name,
        genreId: data.genreId,
        price: data.price,
        releaseDate: data.releaseDate,
      });
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };
  fetchGame();

  const fetchGenres = async () => {
    try {
      const response = await fetch(`/genres`);
      const data = await response.json();
      setGenres(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  fetchGenres();

  return (
    <React.Fragment>
      {isLoading ? (<div class="flex justify-center items-center h-[41.4rem] flex-col">
          <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
          <p className="mt-2">Please wait...</p>
        </div>) : (<><h1 className="mt-10 text-center text-5xl font-bold text-sky-600">
          Game information
        </h1><ul className="mt-[7rem] flex items-center flex-col">
            <li className="mb-6 text-2xl text-sky-600">Name: {game.name}</li>
            <li className="mb-6 text-2xl text-sky-600">
              Genre:{" "}
              {genres.map((genre) => (genre.id === game.genreId ? genre.name : ""))}
            </li>
            <li className="mb-6 text-2xl text-sky-600">Price: {game.price}</li>
            <li className="text-2xl text-sky-600">
              Release Date: {game.releaseDate}
            </li>
          </ul><button className="p-2 rounded-md p-2 m-6 ml-20 bg-sky-700 hover:bg-sky-600 text-white pr-4 pl-3">
            <NavLink to="/games">
              <FontAwesomeIcon icon={faCaretLeft} /> Back
            </NavLink>
          </button></>)}
      
    </React.Fragment>
  );
}

export default GameInfo;

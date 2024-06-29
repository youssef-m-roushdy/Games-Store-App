import React, { Component } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import Home from "./Pages/Home";
import Games from "./Pages/Games";
import AddGame from "./Components/AddGame";
import UpdateGame from "./Components/UpdateGame";
import GameInfo from "./Components/GameInfo";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="games" element={<Games />} />
      <Route path="games/add-game" element={<AddGame/>} />
      <Route path="games/update-game/:id" element={<UpdateGame/>} />
      <Route path="/games/game-info/:id" element={<GameInfo/>}/>
    </Route>
  )
);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <RouterProvider router={router} />
      </React.Fragment>
    );
  }
}

export default App;

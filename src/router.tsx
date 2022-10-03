import * as React from "react"
import {
  createBrowserRouter,
} from "react-router-dom";

import Home from "./pages/home"
import TicTacToe from "./pages/tictactoe"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/tic-tac-toe",
    element: <TicTacToe />
  },
])

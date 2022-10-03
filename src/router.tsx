import { createBrowserRouter } from "react-router-dom"

import Home from "./pages/home"
import TicTacToe from "./pages/tictactoe"
import Bingo from "./pages/bingo"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tic-tac-toe",
    element: <TicTacToe />,
  },
  {
    path: "/bingo",
    element: <Bingo />,
  },
])

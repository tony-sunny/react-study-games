import * as React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"

import "./index.css"

import { store } from "./redux/store"
import Game from "./components/game_fc"

const container = document.getElementById("app-root")
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Game />
  </Provider>
)

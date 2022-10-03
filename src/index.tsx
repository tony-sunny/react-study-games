import * as React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"

import "./index.css"

import { router } from "./router"
import { store } from "./redux/store"

const container = document.getElementById("app-root")
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

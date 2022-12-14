import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import gameReducer from "../reducers/tictactoe"
import { rootSaga } from "../../sagas"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    tictactoe: gameReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

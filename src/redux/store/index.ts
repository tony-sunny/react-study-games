import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import gameReducer from "../reducers/game"
import { rootSaga } from "../../sagas"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

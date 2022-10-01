import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"

type GameState = {
  winner?: string
}

const initialState: GameState = {
  winner: null,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWinner: (state: GameState, action: PayloadAction<{ winner: string }>) => {
      state.winner = action.payload.winner
    },
  },
})

const { actions, reducer } = gameSlice

export const getWinner = (state: RootState) => state.game.winner

export const { setWinner } = actions

export default reducer

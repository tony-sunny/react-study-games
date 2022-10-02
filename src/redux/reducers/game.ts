import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"

type GameState = {
  winner?: string
  stepNumber: number
  isResetting: boolean
}

const initialState: GameState = {
  winner: null,
  stepNumber: 0,
  isResetting: false
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWinner: (state: GameState, action: PayloadAction<string | null>) => {
      state.winner = action.payload
    },
    updateStepNumber: (state: GameState, action: PayloadAction<number>) => {
      state.stepNumber = action.payload
    },
    isResetting: (state: GameState) => {
      state.isResetting = true
    },
    resetGame: () => {
      return initialState
    },
  },
})

const { actions, reducer } = gameSlice

export const getWinner = (state: RootState) => state.game.winner
export const getStepNumber = (state: RootState) => state.game.stepNumber
export const getResetStatus = (state: RootState) => state.game.isResetting

export const { setWinner, updateStepNumber, resetGame } = actions

export default reducer

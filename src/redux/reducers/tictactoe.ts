import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"

type TicTacToeState = {
  winner?: string
  stepNumber: number
  isResetting: boolean
}

const initialState: TicTacToeState = {
  winner: null,
  stepNumber: 0,
  isResetting: false,
}

const ticTacToeSlice = createSlice({
  name: "tictactoe",
  initialState,
  reducers: {
    setWinner: (state: TicTacToeState, action: PayloadAction<string | null>) => {
      state.winner = action.payload
    },
    updateStepNumber: (state: TicTacToeState, action: PayloadAction<number>) => {
      state.stepNumber = action.payload
    },
    isResetting: (state: TicTacToeState) => {
      state.isResetting = true
    },
    resetGame: () => {
      return initialState
    },
  },
})

const { actions, reducer } = ticTacToeSlice

export const getWinner = (state: RootState) => state.tictactoe.winner
export const getStepNumber = (state: RootState) => state.tictactoe.stepNumber
export const getResetStatus = (state: RootState) => state.tictactoe.isResetting

export const { setWinner, updateStepNumber, resetGame } = actions

export default reducer

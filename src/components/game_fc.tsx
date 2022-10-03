import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"

import Board from "./board"
import { calculateTicTacToeWinner } from "../helpers/game"
import {
  setWinner,
  getWinner,
  updateStepNumber,
  getStepNumber,
  getResetStatus,
} from "../redux/reducers/tictactoe"
import { gameSagaActions } from "../sagas"

type History = { squares: Array<string | null> }[]

export default () => {
  const [history, setHistory] = useState<History>([{ squares: Array(9).fill(null) }])
  const [xIsNext, setXIsNext] = useState(true)

  const winner = useSelector(getWinner)
  const stepNumber = useSelector(getStepNumber)
  const resetStatus = useSelector(getResetStatus)
  const desc = useSelector(
    createSelector(
      [getWinner, getStepNumber],
      (winner, stepNumber) => `${winner} won in ${stepNumber} moves`
    )
  )

  const dispatch = useDispatch()

  const resetGame = () => {
    dispatch(gameSagaActions.resetGame)
    setHistory([{ squares: Array(9).fill(null) }])
    setXIsNext(true)
  }

  const handleClick = (i: number) => {
    const currHistory = history.slice(0, stepNumber + 1)
    const currentMove = currHistory[history.length - 1]
    const squares = currentMove.squares.slice()

    // Dont do anything if square is filled or game is finished
    if (squares[i] || winner) {
      return
    }

    squares[i] = xIsNext ? "X" : "O"
    const calculatedWinner = calculateTicTacToeWinner(squares, stepNumber + 1)
    setHistory(currHistory.concat({ squares }))
    setXIsNext(!xIsNext)
    dispatch(updateStepNumber(currHistory.length))
    if (calculateTicTacToeWinner) {
      dispatch(setWinner(calculatedWinner))
    }
  }

  const jumpTo = (step: number) => {
    const currentHistory = history.slice(0, step + 1)[history.length - 1]
    const calculatedWinner = calculateTicTacToeWinner(currentHistory.squares, step)
    setXIsNext(step % 2 === 0)
    dispatch(updateStepNumber(step))
    dispatch(setWinner(calculatedWinner))
  }

  if (resetStatus) {
    return <p> Resetting.... </p>
  }
  const current = history[stepNumber]

  const moves = history.map((_, move) => {
    if (move) {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{`Go to move ${move}`}</button>
        </li>
      )
    } else {
      return null
    }
  })

  const status = winner ? desc : `Next player: ${xIsNext ? "X" : "O"}`

  const squareProps = current.squares.map(s => ({ value: s }))

  return (
    <div className="game">
      <div className="game-board">
        <Board type="tic-tac-toe" squares={squareProps} onClick={handleClick} />
      </div>
      <div className="game-info">
        <button onClick={resetGame}>New Game</button>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

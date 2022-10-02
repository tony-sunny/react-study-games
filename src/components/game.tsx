import React from "react"
// import { Dispatch } from "redux"
import { connect, ConnectedProps } from "react-redux"
import { createSelector } from "reselect"

import Board from "./board"
import { calculateWinner } from "../helpers/game"
import {
  setWinner,
  getWinner,
  updateStepNumber,
  getStepNumber,
  getResetStatus,
} from "../redux/reducers/game"
import { RootState } from "../redux/store"
import { gameSagaActions } from "../sagas"

const mapStateToProps = (state: RootState) => ({
  winner: getWinner(state),
  stepNumber: getStepNumber(state),
  isResetting: getResetStatus(state),
  comb: createSelector(
    [getWinner, getStepNumber],
    (winner, stepNUmber) => `${winner}:${stepNUmber}`
  )(state),
})

const mapDispatchToProps = {
  updateStepNumber: (step: number) => updateStepNumber(step),
  setWinner: (winner: string | null) => setWinner(winner),
  resetGame: () => gameSagaActions.resetGame,
}
// If argument needed
// const mapDispatchToProps = (dispatch: Dispatch, ownProps) => {
//   updateStepNumber: (step: number) => dispatch(updateStepNumber(step)),
//   setWinner: (winner: string | null) => dispatch(setWinner(winner)),
//   resetGame: () => dispatch(gameSagaActions.resetGame),
// }

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux
type State = {
  history: { squares: Array<string | null> }[]
  xIsNext: boolean
}

const initialState: State = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  xIsNext: true,
}

class Game extends React.PureComponent<Props, State> {
  state: State = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    xIsNext: true,
  }

  resetGame = () => {
    this.props.resetGame()
    this.setState(initialState)
  }

  handleClick = (i: number) => {
    const history = this.state.history.slice(0, this.props.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    // Dont do anything if square is filled or game is finished
    if (squares[i] || this.props.winner) {
      return
    }

    squares[i] = this.state.xIsNext ? "X" : "O"
    const winner = calculateWinner(squares, this.props.stepNumber + 1)
    this.setState(state => {
      return {
        history: history.concat({ squares }),
        xIsNext: !state.xIsNext,
      }
    })
    this.props.updateStepNumber(history.length)
    if (winner) {
      this.props.setWinner(winner)
    }
  }

  jumpTo = (step: number) => {
    const history = this.state.history.slice(0, step + 1)
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares, step)
    this.setState({ xIsNext: step % 2 === 0 })
    this.props.updateStepNumber(step)
    // need to set winner always even if its null
    // since we want to clear winner.
    this.props.setWinner(winner)
  }

  render() {
    if (this.props.isResetting) {
      return <p> Resetting.... </p>
    }

    const history = this.state.history
    const current = history[this.props.stepNumber]
    const winner = this.props.winner

    const moves = history.map((_, move) => {
      if (move) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{`Go to move ${move}`}</button>
          </li>
        )
      } else {
        return null
      }
    })

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <button onClick={this.resetGame}>New Game</button>
          <div>{this.props.comb}</div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default connector(Game)

import React from "react"
import { connect, ConnectedProps } from "react-redux"

import Board from "./board"
import { calculateWinner } from "../helpers/game"
import { setWinner, getWinner } from "../redux/reducers/game"
import { RootState } from "../redux/store"

const mapStateToProps = (state: RootState) => ({
  winner: getWinner(state),
})
const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & ReturnType<typeof mapStateToProps>
type State = {
  history: { squares: Array<string | null> }[]
  stepNumber: number
  xIsNext: boolean
}

const initialState: State = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
}

class Game extends React.Component<Props, State> {
  state: State = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  }

  resetGame = () => {
    this.setState(initialState)
    this.props.dispatch(setWinner({ winner: null }))
  }

  handleClick = (i: number) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    // Dont do anything if square is filled or game is finished
    if (squares[i] || this.props.winner) {
      return
    }

    squares[i] = this.state.xIsNext ? "X" : "O"
    const winner = calculateWinner(squares, this.state.stepNumber + 1)
    this.setState(state => {
      return {
        history: history.concat({ squares }),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      }
    })
    if (winner) {
      this.props.dispatch(setWinner({ winner }))
    }
  }

  jumpTo = (step: number) => {
    const history = this.state.history.slice(0, step + 1)
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares, step)
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
    // need to set winner always even if its null
    // since we want to clear winner.
    this.props.dispatch(setWinner({ winner }))
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
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
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

export default connector(Game)

import { useEffect, useState } from "react"

import Board from "../components/board"
import {
  calculateBingoWinner,
  copyArrayShallow,
  makeBingoSquares,
  shuffleArray,
} from "../helpers/game"
import { BingoPlayer, BoardSquare } from "../types"

const Bingo = () => {
  const [squares, setSquares] = useState({
    player: makeBingoSquares(),
    computer: makeBingoSquares(true),
  })
  const [showComputer, setShowComputer] = useState(false)
  const [isGameStarted, setGameStarted] = useState(false)
  const [isPlayerNext, setIsPlayerNext] = useState(false)
  const [winner, setWinner] = useState(null)

  const updateSquares = (index: number, moveBy: BingoPlayer) => {
    const { player, computer } = squares
    const compSquaresCopy = copyArrayShallow(computer)
    const playerSquaresCopy = copyArrayShallow(player)
    if (moveBy === BingoPlayer.COMPUTER) {
      const value = compSquaresCopy[index].value
      compSquaresCopy[index] = {
        value,
        isMarked: true,
      }
      const playerIndex = playerSquaresCopy.findIndex(s => s.value === value)
      playerSquaresCopy[playerIndex] = {
        value: playerSquaresCopy[playerIndex].value,
        isMarked: true,
      }
    } else {
      const value = playerSquaresCopy[index].value
      playerSquaresCopy[index] = {
        value: value,
        isMarked: true,
      }
      const compIndex = compSquaresCopy.findIndex(s => s.value == value)
      compSquaresCopy[compIndex] = {
        value: compSquaresCopy[compIndex].value,
        isMarked: true,
      }
    }
    const calculatedWinner = calculateBingoWinner(
      {
        player: playerSquaresCopy,
        computer: compSquaresCopy,
      },
      moveBy
    )
    setSquares({
      player: playerSquaresCopy,
      computer: compSquaresCopy,
    })
    if (calculatedWinner) {
      setWinner(calculatedWinner)
    } else {
      setIsPlayerNext(moveBy === BingoPlayer.COMPUTER)
    }
  }

  useEffect(() => {
    if (isGameStarted && !winner && !isPlayerNext) {
      const { computer } = squares
      // just mark randomly without any strategy
      const unmarked = computer.reduce((acc, c, index) => {
        if (!c.isMarked) {
          acc.push(index)
        }
        return acc
      }, [])
      const indexToUpdate = shuffleArray(unmarked).pop()
      if (indexToUpdate >= 0) {
        updateSquares(indexToUpdate, BingoPlayer.COMPUTER)
      }
    }
  }, [isGameStarted, isPlayerNext])

  const handleClick = (i: number) => {
    if (winner) {
      return
    }
    // game begun and its computer's turn
    if (isGameStarted && !isPlayerNext) {
      return
    }
    const { player, computer } = squares
    const { isMarked, value } = player[i]
    if (isMarked) {
      return
    }
    if (!isGameStarted && value) {
      if (isSquareFilled(player)) {
        alert("Please click start game button after filling")
      }
      return
    }
    if (isGameStarted) {
      updateSquares(i, BingoPlayer.PLAYER)
    } else {
      // filling
      const playerSquaresCopy = copyArrayShallow(player)
      const filledCount = playerSquaresCopy.filter(s => s.value).length
      playerSquaresCopy[i] = {
        value: filledCount + 1,
        isMarked: false,
      }
      setSquares({
        player: playerSquaresCopy,
        computer: computer,
      })
    }
  }

  const isSquareFilled = (square: BoardSquare[]) => {
    return square.every(s => s.value)
  }

  const startGame = () => {
    const { player, computer } = squares
    const isFilled = isSquareFilled(player)
    if (!isFilled) {
      alert("Please fill squares first")
      return
    }
    const compSquaresCopy = copyArrayShallow(computer)
    setSquares({
      player,
      computer: shuffleArray(compSquaresCopy),
    })
    setGameStarted(true)
    setIsPlayerNext(Math.floor(Math.random() * 2) == 0)
  }

  const resetGame = () => {
    setSquares({
      player: makeBingoSquares(),
      computer: makeBingoSquares(true),
    })
    setGameStarted(false)
    setIsPlayerNext(false)
    setWinner(null)
  }

  const getStatus = () => {
    if (winner) {
      return `${winner} WON!!!`
    } else if (isGameStarted) {
      return isPlayerNext ? "Your Turn" : "Computer's Turn"
    } else {
      const isFilled = isSquareFilled(squares.player)
      return isFilled ? "Start Game" : "Filling Squares"
    }
  }

  const handleCheckBox = () => {
    setShowComputer(!showComputer)
  }

  return (
    <div className="game">
      <div className="grid-container">
        <div>
          {`Player: ${getStatus()}`}
          <div className="game-board">
            <Board type="bingo" squares={squares.player} onClick={handleClick} />
          </div>
        </div>
        <div>
          {!isGameStarted && (
            <div className="game-info">
              <button onClick={startGame}>Start Game</button>
            </div>
          )}
          <div className="game-info">
            <button onClick={resetGame}>New Game</button>
          </div>
          <label>
            <input type="checkbox" checked={showComputer} onChange={handleCheckBox} />
            Show Computer
          </label>
        </div>
        {showComputer && (
          <div>
            Computer
            <div className="game-board">
              <Board type="bingo" squares={squares.computer} onClick={handleClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Bingo

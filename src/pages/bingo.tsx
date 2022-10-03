import { useState } from "react"

import Board from "../components/board"
import { copyArrayShallow, shuffleArray, makeBingoSquares } from "../helpers/game"
import { BoardSquare } from "../types"

const Bingo = () => {
  const [playerSquares, setPlayerSquares] = useState(makeBingoSquares())
  const [compSquares, setCompSquares] = useState(makeBingoSquares(true))
  const [isGameStarted, setGameStarted] = useState(false)
  const [isPlayerNext, setIsPlayerNext] = useState(false)

  const handleClick = (i: number) => {
    // game begun and its computer's turn
    if (isGameStarted && !isPlayerNext) {
      return
    }
    const { isMarked, value } = playerSquares[i]
    if (isMarked) {
      return
    }
    if (!isGameStarted && value) {
      if (isSquareFilled(playerSquares)) {
        alert("Please click start game button after filling")
      }
      return
    }
    const playerSquaresCopy = copyArrayShallow(playerSquares)
    const filledCount = playerSquaresCopy.filter(s => s.value).length
    playerSquaresCopy[i] = {
      value: isGameStarted ? value : filledCount + 1,
      isMarked: isGameStarted ? true : false,
    }
    setPlayerSquares(playerSquaresCopy)
    if (isGameStarted) {
      setIsPlayerNext(false)
    }
  }

  const isSquareFilled = (square: BoardSquare[]) => {
    return square.every(s => s.value)
  }

  const startGame = () => {
    const isFilled = isSquareFilled(playerSquares)
    if (!isFilled) {
      alert("Please fill squares first")
      return
    }
    const compSquaresCopy = copyArrayShallow(compSquares)
    setCompSquares(shuffleArray(compSquaresCopy))
    setGameStarted(true)
    setIsPlayerNext(true)
  }

  const resetGame = () => {
    setPlayerSquares(makeBingoSquares())
    setCompSquares(makeBingoSquares(true))
    setGameStarted(false)
    setIsPlayerNext(false)
  }

  const getStatus = () => {
    if (isGameStarted) {
      return isPlayerNext ? "Your Turn" : "Computer's Turn"
    } else {
      const isFilled = isSquareFilled(playerSquares)
      return isFilled ? "Start Game" : "Filling Squares"
    }
  }

  return (
    <div className="game">
      <div className="grid-container">
        <div>
          {`Player: ${getStatus()}`}
          <div className="game-board">
            <Board type="bingo" squares={playerSquares} onClick={handleClick} />
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
        </div>
        <div>
          Computer
          <div className="game-board">
            <Board type="bingo" squares={compSquares} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bingo

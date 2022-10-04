import { BingoPlayer, BingoSquare, Primitives } from "../types/index"

export const makeBingoSquares = (fill: boolean = false) => {
  return Array.from({ length: 25 }, (value: null, index) => ({
    value: fill ? index + 1 : value,
    isMarked: false,
  }))
}

export const copyArrayShallow = <T extends Record<string, Primitives>>(array: T[]) => {
  return array.map(i => ({ ...i }))
}

export const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const calculateTicTacToeWinner = (squares: string[], stepNumber: number) => {
  if (stepNumber < 5) {
    return null
  }
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const isBingo = (squares: BingoSquare[]) => {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ]
  let bingoCount = 0
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i]
    if (
      squares[a]?.isMarked &&
      squares[b]?.isMarked &&
      squares[c]?.isMarked &&
      squares[d]?.isMarked &&
      squares[e]?.isMarked
    ) {
      bingoCount++
    }
  }
  return bingoCount >= 5
}

type Squares = { computer: BingoSquare[]; player: BingoSquare[] }

export const calculateBingoWinner = (squares: Squares, moveBy: BingoPlayer) => {
  const { computer, player } = squares
  const isPlayerWon = isBingo(player)
  const isComputerWon = isBingo(computer)
  const bothWon = isPlayerWon && isComputerWon
  if (bothWon) {
    return moveBy
  } else if (isPlayerWon) {
    return BingoPlayer.PLAYER
  } else if (isComputerWon) {
    return BingoPlayer.COMPUTER
  } else {
    return null
  }
}

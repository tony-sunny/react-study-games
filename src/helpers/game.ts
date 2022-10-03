export const makeBingoSquares = (fill: boolean = false) => {
  return Array.from({ length: 25 }, (value: null, index) => ({
    value: fill ? index + 1 : value,
    isMarked: false,
  }))
}

export const copyArrayShallow = <T extends Record<any, any>>(array: T[]) => {
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

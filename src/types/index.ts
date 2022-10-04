export type Primtives = string | number | boolean | null

export type BingoSquare = {
  value: number | null
  isMarked: boolean
}

export const enum BingoPlayer {
  PLAYER = "player",
  COMPUTER = "computer",
}

export type BoardSquare = {
  value: string | number | null
  isMarked?: boolean
  highlight?: boolean
}

import { Square } from "./square"
import { BoardSquare } from "../types"

type Props = {
  type: "bingo" | "tic-tac-toe"
  onClick: (i: number) => void
  squares: BoardSquare[]
}

const Board = (props: Props) => {
  const boardSize = props.type === "tic-tac-toe" ? 3 : 5

  const renderSquare = (i: number) => {
    return (
      <Square
        key={i}
        value={props.squares[i].value}
        isMarked={props.squares[i]?.isMarked ?? false}
        highlight={false}
        onClick={() => props.onClick(i)}
      />
    )
  }

  return (
    <div>
      {Array.from({ length: boardSize }, (_, i) => {
        return (
          <div key={i} className="board-row">
            {Array.from({ length: boardSize }, (_, j) => renderSquare(i * boardSize + j))}
          </div>
        )
      })}
    </div>
  )
}

export default Board

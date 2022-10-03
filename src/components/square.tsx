type Props = {
  onClick: () => void
  value: string | number | null
  isMarked: boolean
  highlight: boolean
}

export const Square = (props: Props) => {
  return (
    <button className={`square ${props.isMarked ? "marked" : ""}`} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

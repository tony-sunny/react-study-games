import React from "react"

type Props = {
  onClick: () => void
  value: string | null
}

export const Square = (props: Props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

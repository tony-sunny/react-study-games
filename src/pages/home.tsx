import * as React from "react"
import { Link } from "react-router-dom";


export default () => {
  return (
    <>
      <h1> Games </h1>
      <ul>
        <li>
          <Link to={`/tic-tac-toe`}>Tic Tac Toe</Link>
        </li>
      </ul>
    </>
  )
}

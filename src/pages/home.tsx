import { Link } from "react-router-dom"

export default () => {
  return (
    <>
      <h1> Games </h1>
      <ul>
        <li>
          <Link to={`/tic-tac-toe`}>Tic Tac Toe</Link>
        </li>
        <li>
          <Link to={`/bingo`}>Bingo</Link>
        </li>
      </ul>
    </>
  )
}

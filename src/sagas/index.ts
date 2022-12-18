import { PayloadAction } from "@reduxjs/toolkit"
import { all, call, put, takeEvery } from "redux-saga/effects"

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const execute = (b: boolean) => {
  return b ? delay(3000).then(() => "SUCCESS") : Promise.reject("ERROR")
}

export const gameSagaActions = {
  resetGame: { type: "GAME_RESET_REQUESTED", payload: true },
}

function* resetGame(action: PayloadAction<boolean>) {
  // Inside resetGame handler function inside component
  // we called setState and props.resetGame together. We
  // need a status like below because component will rerender
  // when GAME_RESET_REQUESTED action is dispatched since state
  // has been changed by setState
  // if execute is not async this wont happen since since setState
  // calls are batched
  yield put({ type: "tictactoe/isResetting" })
  try {
    const status: string = yield call(execute, action.payload)
    yield put({ type: "tictactoe/resetGame", payload: status })
  } catch (e) {
    yield put({ type: "tictactoe/resetGame", payload: e.message })
  }
}

function* watchGameResetSaga() {
  yield takeEvery("GAME_RESET_REQUESTED", resetGame)
}

export function* rootSaga() {
  yield all([watchGameResetSaga()])
}

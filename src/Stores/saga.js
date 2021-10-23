import { all } from "redux-saga/effects";
import AuthSagas from "./Auth/saga";
import QuizzSagas from "./Quizz/saga";
export default function* rootSaga() {
  yield all([AuthSagas(), QuizzSagas()]);
}

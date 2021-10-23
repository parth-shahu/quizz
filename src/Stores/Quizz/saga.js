import { all, put, select, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import {
  selectTechnologySuccess,
  selectTechnologyFailure,
  submitQuizzSuccess,
  submitQuizzFailure,
} from "./actions";
import Quizz from "../../Config/quizz";

export function* getTechnology({ payload }) {
  let data = Quizz.filter((val) => val.id == payload);
  try {
    yield put(selectTechnologySuccess(data));
  } catch (e) {
    yield put(selectTechnologyFailure("Error while select technology!"));
  }
}

export function* onSubmitQuizz({ payload }) {
  let currectAnswer = 0;
  if (payload?.data?.length > 0) {
    payload?.data?.map((ele) => {
      if (ele?.correct_answer == ele?.selected_answer) {
        currectAnswer += 1;
      }
    });
  }
  try {
    yield put(
      submitQuizzSuccess({
        currectAnswer,
        tech_id: payload.id,
        data: payload.data,
      })
    );
    payload.history.push("/result");
  } catch (e) {
    yield put(submitQuizzFailure("Error while submit quizz!"));
  }
}

export function* selectTechnologyWatcher() {
  yield takeLatest(types.SELECT_TECHNOLOGY, getTechnology);
}

export function* submitQuizzWatcher() {
  yield takeLatest(types.SUBMIT_QUIZZ, onSubmitQuizz);
}

export default function* quizzSaga() {
  yield all([selectTechnologyWatcher(), submitQuizzWatcher()]);
}

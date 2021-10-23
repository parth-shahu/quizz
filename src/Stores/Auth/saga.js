/* eslint-disable camelcase */
import { all, put, takeLatest } from "redux-saga/effects";
import actions from "./actions";
import * as types from "./constants";
import users from "../../Config/users.json";
const {
  checkFailure,
  checkSuccess,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
} = actions;

export function* checkAuth({ token, history }) {
  if (token) {
    let user = users.filter((val) => val.token === token);
    if (user && user.length > 0) {
      user = user[0];
      yield put(checkSuccess({ token: user.token, user: user }));
    } else {
      yield put(checkFailure("Invalid token"));
    }
  } else {
    yield put(checkFailure("Invalid token"));
  }
}

export function* login({ credentials, history }) {
  const { email, password } = credentials;

  if (users && users.length > 0) {
    let user = users.filter((val) => val.email === email);
    if (user.length > 0) {
      user = user[0];
      if (user?.password === password) {
        yield put(loginSuccess({ token: user.token, user: user }));
        localStorage.setItem("token", user.token);
        history.push("/technology");
      } else {
        yield put(loginFailure({ error: "Password incorrect" }));
        localStorage.clear();
      }
    } else {
      yield put(loginFailure({ error: "User not found!" }));
      localStorage.clear();
    }
  } else {
    yield put(loginFailure({ error: "" }));
    localStorage.clear();
  }
}

export function* logout({ history }) {
  try {
    localStorage.clear();
    history.push("/");
    yield put(logoutSuccess("Logout successfully"));
  } catch (e) {
    localStorage.clear();
    yield put(logoutFailure("Logout error"));
  }
}

export function* loginFlow() {
  yield takeLatest(types.LOGIN, login);
}

export function* logoutFlow() {
  yield takeLatest(types.LOGOUT, logout);
}

export function* checkAuthFlow() {
  yield takeLatest(types.CHECK, checkAuth);
}

export default function* rootAuthSaga() {
  yield all([loginFlow(), checkAuthFlow(), logoutFlow()]);
}

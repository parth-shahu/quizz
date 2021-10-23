import * as types from "./constants";
const actions = {
  login: (credentials, history) => {
    return {
      type: types.LOGIN,
      credentials,
      history,
    };
  },
  loginSuccess: (payload) => {
    return {
      type: types.LOGIN_SUCCESS,
      payload,
    };
  },
  loginFailure: (error) => {
    return {
      type: types.LOGIN_FAILURE,
      error,
    };
  },
  check: (token, history) => {
    return {
      type: types.CHECK,
      token,
      history,
    };
  },

  checkSuccess: (payload) => {
    return {
      type: types.CHECK_SUCCESS,
      payload,
    };
  },
  checkFailure: (error) => {
    return {
      type: types.CHECK_FAILURE,
      error,
    };
  },
  logout: (history) => {
    return {
      type: types.LOGOUT,
      history,
    };
  },
  logoutSuccess: (payload) => {
    return {
      type: types.LOGOUT_SUCCESS,
      payload,
    };
  },
  logoutFailure: (error) => {
    return {
      type: types.LOGOUT_FAILURE,
      error,
    };
  },
};
export default actions;

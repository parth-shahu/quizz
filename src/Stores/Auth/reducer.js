import * as types from "./constants";

export const initialState = {
  isLoggingIn: false,
  isAuthenticating: false,
  isLoggingOut: false,
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoggingIn: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        isLoggingIn: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error,
      };
    case types.CHECK:
      return {
        ...state,
        isAuthenticating: true,
      };
    case types.CHECK_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case types.CHECK_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        user: null,
        token: null,
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggingOut: true,
        error: null,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        user: null,
        token: null,
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;

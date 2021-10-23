import * as types from "./constants";

export const selectTechnology = (payload) => ({
  type: types.SELECT_TECHNOLOGY,
  payload,
});

export const selectTechnologySuccess = (payload) => ({
  type: types.SELECT_TECHNOLOGY_SUCCESS,
  payload,
});

export const selectTechnologyFailure = (payload) => ({
  type: types.SELECT_TECHNOLOGY_FAILURE,
  payload,
});

export const submitQuizz = (payload) => ({
  type: types.SUBMIT_QUIZZ,
  payload,
});

export const submitQuizzSuccess = (payload) => ({
  type: types.SUBMIT_QUIZZ_SUCCESS,
  payload,
});

export const submitQuizzFailure = (payload) => ({
  type: types.SUBMIT_QUIZZ_FAILURE,
  payload,
});

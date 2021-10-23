import * as types from "./constants";

const initialState = {
  selectedTechnology: "",
  quizzList: [],
  result: {},
  fetchingQuizz: false,
  submitQuizz: false,
  generateResult: false,
  error: null,
};
const QuizzReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_TECHNOLOGY:
      return {
        ...state,
        fetchingQuizz: true,
        error: null,
      };

    case types.SELECT_TECHNOLOGY_SUCCESS:
      return {
        ...state,
        fetchingQuizz: false,
        quizzList: action.payload,
        error: null,
      };

    case types.SELECT_TECHNOLOGY_FAILURE:
      return {
        ...state,
        fetchingQuizz: false,
        quizzList: [],
        error: action.payload,
      };
    case types.SUBMIT_QUIZZ:
      return {
        ...state,
        submitQuizz: true,
        error: null,
      };

    case types.SUBMIT_QUIZZ_SUCCESS:
      return {
        ...state,
        submitQuizz: false,
        result: action.payload,
        error: null,
      };

    case types.SUBMIT_QUIZZ_FAILURE:
      return {
        ...state,
        submitQuizz: false,
        result: {},
        error: action.payload,
      };

    default:
      return state;
  }
};
export default QuizzReducer;

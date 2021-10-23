import { combineReducers } from "redux";
import AuthReducer from "./Auth/reducer";
import QuizzReducer from "./Quizz/reducer";

const rootReducer = combineReducers({
  AuthReducer,
  QuizzReducer,
});

export default rootReducer;

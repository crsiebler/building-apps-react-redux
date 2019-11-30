import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
  apiCallsInProgress,
  courses,
  authors
});

export default rootReducer;

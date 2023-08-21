import useReducer  from "./users/userReducer";
import { combineReducers } from "redux";
import workDateReducer from "./workdates/workDateReducer";

const rootReducer = combineReducers({
  users: useReducer,
  workDates: workDateReducer
});

export default rootReducer;

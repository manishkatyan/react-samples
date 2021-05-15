import { combineReducers } from "redux";
import counterReducer from "./components/redux/counterReducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `counter`, handled by `counterReducer`
  counter: counterReducer,
});

export default rootReducer;

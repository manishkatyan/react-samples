import { createStore } from "redux";
import rootReducer from "./reducers";

// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
const store = createStore(rootReducer);
export default store;

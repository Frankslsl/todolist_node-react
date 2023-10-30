import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";

const store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk));
export default store;

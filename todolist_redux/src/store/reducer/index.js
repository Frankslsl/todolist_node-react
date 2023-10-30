import taskReducer from "./TaskReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
	task: taskReducer,
});

export default reducer;

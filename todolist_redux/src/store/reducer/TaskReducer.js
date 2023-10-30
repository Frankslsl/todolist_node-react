import * as TYPES from "../action-types";
import moment from "moment";
import _ from "lodash";

const initial = {
	taskList: null,
};
export default function taskReducer(state = initial, action) {
	console.log("Action received:", action);
	// let nextState = _.clone(true, state);
	let nextState = _.cloneDeep(state);

	switch (action.type) {
		case TYPES.TASK_LIST:
			nextState.taskList = action.list;
			break;
		case TYPES.TASK_REMOVE:
			console.log(nextState);

			nextState.taskList = _.filter(nextState.taskList, (item) => {
				return item._id !== action.id;
			});
			console.log(nextState);
			break;
		case TYPES.TASK_UPDATE:
			nextState.taskList = _.map(nextState.taskList, (item) => {
				if (item._id === action.id) {
					return {
						...item,
						isDone: true,
						complete: moment().format("YYYY-MM-DD HH:mm:ss"),
					};
				}
				return item;
			});
			break;
		default:
			return state;
	}

	return nextState;
}

/*
先分析这个模块都有那些需要修改公共状态,然后完成actionType,再根据业务完成reducer
业务逻辑是,再TaskAction中,actionCreator返回的分别是:
1. dispatch({type:"TASK_LIST", list:{...}})
2. dispatch({type:"TASK_REMOVE", id:xxx})
3. dispatch({type:"TASK_UPDATE", id:xxx})
这样传到reducer才能正确的修改state

这样直接修改redux可以避免过多的从服务器重新调用所有的list再进行渲染
*/

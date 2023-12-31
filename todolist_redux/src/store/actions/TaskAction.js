import { cloneElement } from "react";
import * as TYPES from "../action-types";
import axios from "axios";

const taskAction = {
	insert: (data) => {
		return async (dispatch) => {
			try {
				const insertTask = await axios({
					method: "post",
					url: "http://localhost:9000/tasks",
					data,
				});
				taskAction.queryAllList()(dispatch);
			} catch (error) {
				console.error("something went wrong when inserting", error);
			}
		};
	},
	queryAllList: () => {
		console.log("first");
		return async (dispatch) => {
			try {
				const result = await axios({
					method: "get",
					url: `http://localhost:9000/tasks/All`,
				});
				dispatch(taskAction.dispatchQueryAllList(result.data));
			} catch (error) {
				console.error("An error occurred when getting all data:", error);
			}
		};
	},

	update: (id) => {
		return async (dispatch) => {
			try {
				const finishTask = await axios({
					method: "put",
					url: `http://localhost:9000/tasks/${id}`,
				});
				dispatch(taskAction.dispatchUpdate(id));
			} catch (error) {
				console.error("An error occurred when updating:", error);
			}
		};
	},
	remove: (id) => {
		console.log("removing");
		return async (dispatch) => {
			try {
				const remove = await axios({
					method: "delete",
					url: `http://localhost:9000/tasks/${id}`,
				});
				dispatch(taskAction.dispatchRemove(id));
			} catch (error) {
				console.error("An error occurred when updating:", error);
			}
		};
	},

	dispatchQueryAllList(list) {
		return {
			type: TYPES.TASK_LIST,
			list,
		};
	},

	dispatchUpdate(id) {
		return { type: TYPES.TASK_UPDATE, id };
	},
	dispatchRemove(id) {
		return { type: TYPES.TASK_REMOVE, id };
	},
};
export default taskAction;

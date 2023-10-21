const mongoose = require("mongoose");
const moment = require("moment");

const getDueTime = () => {
	const now = moment();
	const defaultDueTime = now.add(1, "day").format("YYYY-MM-DD HH:mm:ss");
	return defaultDueTime;
};

const taskSchema = new mongoose.Schema({
	task: { type: String, required: true },
	isDone: { type: Boolean, required: true, default: false },
	time: { type: String, default: getDueTime() },
	complete: { type: String, default: null },
});

let taskModel = mongoose.model("todolist", taskSchema);

module.exports = taskModel;

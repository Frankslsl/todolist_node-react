var express = require("express");
var router = express.Router();
const taskModel = require("../db/taskModel");

//insert a task into database
router.post("/", async function (req, res, next) {
	try {
		const taskJSON = req.body;
		console.log("123", taskJSON);
		const task = new taskModel(taskJSON);
		const saveTask = await task.save();
		res.status(200).json(saveTask);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = router;

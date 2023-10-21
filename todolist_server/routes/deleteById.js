const express = require("express");
const router = express.Router();
const taskModel = require("../db/taskModel");

router.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const deleteTask = await taskModel.findByIdAndDelete(id);
		if (!deleteTask) {
			res.status(404).json({ error: "no such task can be found" });
			return;
		}
		res.status(200).json({ deleteTask });
	} catch (error) {
		console.log("something went wrong when deleting the task");
		res.status(500).json({ error });
	}
});

module.exports = router;

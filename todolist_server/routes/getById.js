const express = require("express");
const router = express.Router();
const taskModel = require("../db/taskModel");

router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const getById = await taskModel.findById(id);
		if (!getById) {
			res.status(404).json({ error: "cant find the task by this id" });
			return;
		}
		res.status(200).json(getById);
	} catch (error) {
		res.status(500).json({ error });
	}
});

module.exports = router;

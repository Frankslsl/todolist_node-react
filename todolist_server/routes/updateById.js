const express = require("express");
const router = express.Router();
const taskModel = require("../db/taskModel");
const moment = require("moment");

router.put("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const now = moment();
		const complete = now.toDate();

		const update = { isDone: true, complete };
		const updateById = await taskModel.findByIdAndUpdate(id, update, {
			new: true,
		});
		res.status(200).json({ updateById });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = router;

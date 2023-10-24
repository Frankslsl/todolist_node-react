var express = require("express");
var router = express.Router();
const bookModel = require("../db/taskModel");
const taskModel = require("../db/taskModel");

/* GET home page. */
router.get("/:filter", async function (req, res, next) {
	try {
		const filter = req.params.filter;
		const getTasks = await taskModel.find();
		if (filter === "Unfinished") {
			return res
				.status(200)
				.json(getTasks.filter((item) => item.isDone === false));
		} else if (filter === "Done") {
			return res
				.status(200)
				.json(getTasks.filter((item) => item.isDone === true));
		}
		res.status(200).json(getTasks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;

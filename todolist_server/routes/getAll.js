var express = require("express");
var router = express.Router();
const bookModel = require("../db/taskModel");
const taskModel = require("../db/taskModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
	try {
		const getTasks = await taskModel.find();
		res.status(200).json(getTasks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;

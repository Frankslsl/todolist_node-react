const dbConnection = require("./db/connection");
const express = require("express");
const app = express();
const taskModel = require("./db/taskModel");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const insert = app.post("/tests", async (req, res) => {
	try {
		console.log(11);
		const taskJSON = req.body;
		const task = new taskModel(taskJSON);
		const saveTask = await task.save();
		console.log(22);
		res.status(200).json(saveTask);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

dbConnection(
	() => {
		console.log(11);
		insert;
		console.log("connected");
	},
	() => {
		console.log("something went wrong");
	}
);

app.listen(8081, () => {
	console.log("8081 is working");
});

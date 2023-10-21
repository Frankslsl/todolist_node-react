const mongoose = require("mongoose");

dbConnection = function (success, error) {
	mongoose.connect("mongodb://20.14.93.178");

	mongoose.connection.once("open", () => {
		console.log("mongodb");
		success();
	});
	mongoose.connection.on("error", () => {
		error();
	});
	mongoose.connection.on("close", () => {
		console.log("close");
	});
};

module.exports = dbConnection;

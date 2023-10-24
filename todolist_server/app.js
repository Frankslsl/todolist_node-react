var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dbConnection = require("./db/connection");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/build")));

dbConnection(
	() => {
		const insert = require("./routes/insert");
		const getAll = require("./routes/getAll");
		const deleteById = require("./routes/deleteById");
		const getById = require("./routes/getById");
		const updateById = require("./routes/updateById");

		app.use("/tasks", insert);
		app.use("/tasks", getAll);
		app.use("/tasks", deleteById);
		app.use("/tasks", getById);
		app.use("/tasks", updateById);
	},
	() => {
		// catch 404 and forward to error handler
		app.use(function (req, res, next) {
			next(createError(404));
		});
	}
);
// app.use("/tasks", insert);

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

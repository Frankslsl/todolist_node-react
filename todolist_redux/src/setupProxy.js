const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		createProxyMiddleware("/todo", {
			target: "http://localhost:9000",
			changeOrigin: true,
			ws: true,
			pathRewrite: { "^/todo": "" },
		})
	);
};

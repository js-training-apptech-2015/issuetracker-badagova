var path = require ("path");

module.exports = {
	context: path.resolve(__dirname, "app/scripts"),
	entry: "./main",
    output: {
        path: path.resolve(__dirname, "dist/scripts"),
        filename: "main.js"
    },
	watch: true
}
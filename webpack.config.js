module.exports = {
	context: __dirname + "/app/scripts",
	entry: "./main",
    watch: true,
    output: {
      //  path: __dirname + "/dist/scripts",
        filename: "main.js"
    }
}
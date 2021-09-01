const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: "./src/index.js",
	mode: "development",
	// Rules of how webpack will take our files, complie & bundle them for the browser
	module: {
		rules: [
			{
				// Extension of files which needs to be targetted by the specific loader, here is babel-loader
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				// Needs to be in this order, css-loader turns css to js files, style-loader extracts css into files as string
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				type: "asset/resource"
			}
		]
	},
	// Extensions that Webpack will resolve - import modules without needing to add their extensions
	// resolve: { extensions: ["*", ".js", ".jsx"] },
	// Where files should be sent once they are bundled
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "index.bundle.js"
	},
	// webpack 5 comes with devServer which loads in development mode
	devServer: {
		port: 3000,
		hot: true
	},
	// HtmlWebpackPlugin ensures webpack knows which html file template to follow
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
			favicon: "./public/favicon.ico",
			manifest: "./public/manifest.json"
		}),
		new FaviconsWebpackPlugin({
			logo: "./public/logo512.png",
			mode: "webapp",
			manifest: "./public/manifest.json"
		}),
		new ESLintPlugin()
	]
};

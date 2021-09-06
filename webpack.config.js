const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const port = process.env.PORT || 8081;

const deps = require("./package.json").dependencies;
module.exports = {
	mode: "development",
	entry: "./src/index",
	output: {
		publicPath: `http://localhost:${port}/`
	},

	resolve: {
		extensions: [".jsx", ".js", ".json"]
	},

	devServer: {
		port: port
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false
				}
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				type: "asset/resource"
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "less-loader",
						options: {
							lessOptions: {
								modifyVars: {
									// hack: `true; @import "${path.resolve(
									// 	__dirname,
									// 	"theme.less"
									// )}"`
									"primary-color": "#494097",
									"font-family":
										"Source Sans Pro -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
								},
								javascriptEnabled: true
							}
						}
					}
				]
			}
		]
	},

	plugins: [
		new ModuleFederationPlugin({
			name: "app2",
			library: { type: "var", name: "app2" },
			filename: "remoteEntry.js",
			remotes: {
				app1: "app1"
			},
			exposes: {
				"./routes": "./src/routes"
			},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"]
				}
			}
		}),
		new HtmlWebPackPlugin({
			template: "./public/index.html"
		}),
		new ESLintPlugin(),
		new Dotenv()
	]
};

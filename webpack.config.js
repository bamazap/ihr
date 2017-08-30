"use strict";

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// only used in production
try {
  var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
} catch (err) {
  var BrowserSyncPlugin = null;
}

var config = {
	entry: [
		path.join(__dirname, "src/main.js"),
		path.join(__dirname, "src/styles/main.scss")
	],
	output: {
		path: path.join(__dirname, "public/build/"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			// transpiles JSX and ES6 to ES5
			{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

			// extracts CSS as separate output file
			{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader?importLoaders=1"),
      },

			// transpiles SASS/SCSS to CSS
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      },

			// loads font icons for Bootstrap css
			{
					test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
					loader: "file-loader"
			}
		]
	},
  plugins: [
    // output a separate css bundle
    new ExtractTextPlugin("bundle.css"),

    // set node env to development
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
	// needed to make request-promise work
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	}
};

// reloads browser when the watched files change
if (BrowserSyncPlugin) config.plugins.push(new BrowserSyncPlugin({
  host: "127.0.0.1",
  port: 3000,
  // proxy local php server
  proxy: "http://127.0.0.1:8000/",
  // tunnel: true,
  // watch the built files and the index file
  files: ["public/build/*", "public/index.html"],
}));

module.exports = config;

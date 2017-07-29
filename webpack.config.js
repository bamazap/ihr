'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: [
		path.join(__dirname, 'src/main.js'),
		path.join(__dirname, 'src/styles/main.scss')
	],
	output: {
		path: path.join(__dirname, 'public/build/'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			// transpiles JSX and ES6 to ES5
			{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

			// makes jQuery available to Bootstrap js
			{
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      },

			// extracts CSS as separate output file
			{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?importLoaders=1'),
      },

			// transpiles SASS/SCSS to CSS
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },

			// loads font icons for Bootstrap css
			{
        test: /\.woff(2?)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
			{
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
			{
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
			{
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
			{
        test: /\.json$/,
        loader: 'json'
      }
		]
	},
  plugins: [
    // output a separate css bundle
    new ExtractTextPlugin('bundle.css'),

    // reloads browser when the watched files change
    new BrowserSyncPlugin({
			host: '127.0.0.1',
			port: 3000,
			// proxy local php server
      proxy: 'http://127.0.0.1:8000/',
      //tunnel: true,
      // watch the built files and the index file
      files: ['public/build/*', 'public/index.html'],
    }),

    // set node env
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
	// needed to make request-promise work
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};

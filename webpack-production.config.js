

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: [
    path.join(__dirname, 'src/main.js'),
    path.join(__dirname, 'src/styles/main.scss'),
  ],
  output: {
    path: path.join(__dirname, 'public/build/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // transpiles JSX and ES6 to ES5
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      // strip console.log statements for production build
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'webpack-strip?strip[]=console.log!babel-loader',
      },

      // extracts CSS as separate output file
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?importLoaders=1'),
      },

      // transpiles SASS/SCSS to CSS
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },

      // loads font icons for Bootstrap css
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    // output a separate css bundle
    new ExtractTextPlugin('bundle.css'),

    // set node env to development
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  // needed to make request-promise work
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;

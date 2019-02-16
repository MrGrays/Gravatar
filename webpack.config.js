const fs = require('fs');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './plugin.js',
  output: {
    filename: 'plugin-gravatar.min.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env'],
      }
    }]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0"
  }
};

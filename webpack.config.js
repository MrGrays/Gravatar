const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production',
  entry: './src/plugin.js',
  output: {
    filename: 'plugin-gravatar.min.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: [{loader: 'exports-loader'}, {loader: 'babel-loader'}],
        include: [
          path.join(__dirname, 'src')
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    filename: 'plugin-gravatar.min.js',
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};

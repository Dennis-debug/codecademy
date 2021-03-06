var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'app.bundle.js'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              options: {
                  presets: ['es2015', 'react']
              }
          }
      ]
  },
  stats: {
      colors: true
  },
  devtool: 'source-map'
};


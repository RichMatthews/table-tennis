const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './main.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || '"development"'
        }
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  }
}

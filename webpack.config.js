const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    server: './template/server-simulator.js',
    main: [
      'react-hot-loader/patch',
      './src/index.tsx'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.ts(x)?$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'template/index.html',
        inject: true,
      })
  ],
};

module.exports = config;

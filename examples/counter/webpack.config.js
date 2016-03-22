const path = require('path');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV || 'development';

const config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
  ],
  resolve: {
    alias: {
      // 'react': path.join(__dirname, 'node_modules', 'react'),
      'sam': path.join(__dirname, '..', '..',  'lib'),
    },
    extensions: ['', '.js'],
  },
  // resolveLoader: {
  //   'fallback': path.join(__dirname, 'node_modules')
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'], //'react-hot', 
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, '..', '..', 'src')
      }
    ],
  },
};

if (ENV === 'production') {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(ENV) },
    })
  );
  config.output.publicPath = './';
} else {
  // Replace config.plugins
  // config.devtool = 'eval';
  // config.plugins = [new webpack.HotModuleReplacementPlugin()];
  // config.entry = [
  //   // 'webpack-dev-server/client?http://localhost:3000',
  //   'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
  //   'webpack/hot/only-dev-server',
  //   ...config.entry,
  // ];
}

module.exports = config;
